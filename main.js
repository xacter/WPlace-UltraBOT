const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const zlib = require('zlib');
const url = require('url');
let axios; try { axios = require('axios'); } catch (e) { axios = null; }
let puppeteer; try { puppeteer = require('puppeteer'); } catch (e) { puppeteer = null; }

let DEBUG = !!(process.env.DEBUG_HTTP && String(process.env.DEBUG_HTTP) !== '0');
let DEBUG_MASK = !(process.env.DEBUG_MASK === '0' || process.env.DEBUG_MASK === 'false');
function enableDebug() { DEBUG = true; }
function enableDebugFull() { DEBUG = true; DEBUG_MASK = false; }
function maskToken(str) {
  if (!str) return '';
  const s = String(str);
  if (s.length <= 8) return '***';
  return s.slice(0, 4) + '…' + s.slice(-4);
}
function maskCookieHeader(cookieHeader) {
  if (!cookieHeader) return '';
  if (!DEBUG_MASK) return String(cookieHeader);
  let out = String(cookieHeader);
  out = out.replace(/cf_clearance=([^;]+)/i, (_, v) => `cf_clearance=${maskToken(v)}`);
  out = out.replace(/\bj=([^;]+)/i, (_, v) => `j=${maskToken(v)}`);
  return out;
}
function debugLog(...args) { if (DEBUG) { try { console.log('[debug]', ...args); } catch {} } }

const HTTPS_AGENT = new https.Agent({ secureProtocol: 'TLSv1_2_method' });
let axiosClient = null;
if (axios) {
  axiosClient = axios.create({ httpsAgent: HTTPS_AGENT, timeout: 15000, validateStatus: () => true });
  axiosClient.interceptors.request.use((config) => {
    try {
      const headers = { ...(config.headers || {}) };
      const cookieValue = headers.Cookie || headers.cookie || '';
      if (cookieValue) {
        const masked = maskCookieHeader(cookieValue);
        headers.Cookie = masked;
        headers.cookie = masked;
      }
      debugLog('HTTP GET', { url: config && config.url, headers });
    } catch {}
    return config;
  });
  axiosClient.interceptors.response.use((response) => {
    try {
      const data = response && response.data;
      let preview = '';
      if (typeof data === 'string') preview = data.slice(0, 300);
      else {
        try { preview = JSON.stringify(data).slice(0, 300); } catch { preview = String(data).slice(0, 300); }
      }
      debugLog('HTTP GET response', {
        url: response && response.config && response.config.url,
        status: response && response.status,
        statusText: response && response.statusText,
        bodyPreview: preview
      });
    } catch {}
    return response;
  }, (error) => {
    try {
      if (error && error.response) {
        const data = error.response.data;
        let preview = '';
        if (typeof data === 'string') preview = data.slice(0, 300);
        else {
          try { preview = JSON.stringify(data).slice(0, 300); } catch { preview = String(data).slice(0, 300); }
        }
        debugLog('HTTP GET error', {
          url: error.response && error.response.config && error.response.config.url,
          status: error.response && error.response.status,
          bodyPreview: preview
        });
      } else {
        debugLog('HTTP GET network error', { message: error && error.message ? error.message : String(error) });
      }
    } catch {}
    return Promise.reject(error);
  });
}


let gotScrapingFn = null;
async function getGotScrapingFn() {
  if (gotScrapingFn) return gotScrapingFn;
  try {
    const mod = await import('got-scraping');
    gotScrapingFn = mod && (mod.gotScraping || (typeof mod.default === 'function' ? mod.default : null));
  } catch {}
  return gotScrapingFn;
}


const DB_DIR = path.resolve(process.cwd(), 'db');
const ACCOUNTS_FILE = path.join(DB_DIR, 'accounts.json');
const SETTINGS_FILE = path.join(DB_DIR, 'settings.json');

function ensureDb() {
  try { fs.mkdirSync(DB_DIR, { recursive: true }); } catch {}
  if (!fs.existsSync(ACCOUNTS_FILE)) {
    try { fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify([], null, 2)); } catch {}
  }
  if (!fs.existsSync(SETTINGS_FILE)) {
    try { fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ cf_clearance: '', worldX: null, worldY: null }, null, 2)); } catch {}
  }
}

function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


function deactivateAccountByToken(jToken) {
  try {
    if (!jToken) return;
    const accounts = readJson(ACCOUNTS_FILE, []);
    const idx = accounts.findIndex(a => a && typeof a.token === 'string' && a.token === jToken);
    if (idx === -1) return;
    const current = accounts[idx] || {};
    const updated = { ...current, active: false };
    accounts[idx] = updated;
    writeJson(ACCOUNTS_FILE, accounts);
    console.log('[auto] account deactivated due to 500 when posting pixel:', current && current.name ? current.name : '(unknown)');
  } catch {}
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        try { req.socket.destroy(); } catch {}
        reject(new Error('Payload too large')); 
      }
    });
    req.on('end', () => {
      if (!body) { resolve({}); return; }
      try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}


async function requestMeLikePython(opts) {
  const cookieHeader = (opts && opts.cookie)
    ? String(opts.cookie)
    : `cf_clearance=${opts && opts.cf_clearance ? opts.cf_clearance : ''}; j=${opts && opts.j ? opts.j : ''}`;

  const gotScraping = await getGotScrapingFn();
  if (!gotScraping) {
    throw new Error('got-scraping is not available');
  }

  const options = {
    url: 'https://backend.wplace.live/me',
    headers: {
      'Cookie': cookieHeader
    },
    decompress: false,
    timeout: { request: 30000 },
    agent: { https: HTTPS_AGENT }
  };
  debugLog('HTTP GET begin', {
    host: 'backend.wplace.live',
    path: '/me',
    headers: { Cookie: maskCookieHeader(cookieHeader) }
  });

  const resp = await gotScraping(options);
  let bodyBuf = resp.rawBody || Buffer.from(String(resp.body || ''), 'utf8');
  const encoding = ((resp.headers && (resp.headers['content-encoding'] || resp.headers['Content-Encoding'])) || '').toLowerCase();
  if (encoding.includes('gzip')) {
    try { bodyBuf = zlib.gunzipSync(bodyBuf); } catch {}
  } else if (encoding.includes('deflate')) {
    try { bodyBuf = zlib.inflateRawSync(bodyBuf); } catch { try { bodyBuf = zlib.inflateSync(bodyBuf); } catch {} }
  }
  const status = resp.statusCode || 0;
  const reason = resp.statusMessage || '';
  if (!opts || !opts.silent) {
    console.log(`HTTP ${status} ${reason}`);
    try { console.log(bodyBuf.toString('utf8')); } catch { console.log(bodyBuf); }
  }
  debugLog('HTTP GET end', { status, reason, bodyPreview: bodyBuf.toString('utf8').slice(0, 300) });
  return { status, reason, body: bodyBuf.toString('utf8') };
}


async function fetchMeAxios(cf_clearance, token) {
  if (!axios) return null;
  const headers = {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json, text/plain, */*',
    'Cookie': `cf_clearance=${cf_clearance || ''}; j=${token || ''}`
  };
  debugLog('axios GET /me', { headers: { ...headers, Cookie: maskCookieHeader(headers.Cookie) } });
  const resp = await axiosClient.get('https://backend.wplace.live/me', { headers });
  if (!resp || resp.status !== 200) return null;
  const data = resp.data;
  if (data && typeof data === 'object') return data;
  try { return JSON.parse(String(data || '')); } catch { return null; }
}

async function fetchMe(cf_clearance, token) {
  debugLog('GET /me via got-scraping (requestMeLikePython)');
  const r = await requestMeLikePython({ cf_clearance, j: token, silent: true });
  if (!r || r.status !== 200 || !r.body) return null;
  try { return JSON.parse(r.body); } catch { return null; }
}

async function fetchMePuppeteer(cf_clearance, token) {
  if (!puppeteer) return null;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    const cookies = [];
    if (cf_clearance) cookies.push({ name: 'cf_clearance', value: String(cf_clearance), domain: 'backend.wplace.live', path: '/', httpOnly: false, secure: true });
    if (token) cookies.push({ name: 'j', value: String(token), domain: 'backend.wplace.live', path: '/', httpOnly: false, secure: true });
    if (cookies.length) await page.setCookie(...cookies);
    debugLog('puppeteer GET /me with cookies set');
    const res = await page.goto('https://backend.wplace.live/me', { waitUntil: 'networkidle2', timeout: 20000 });
    if (!res || res.status() !== 200) return null;
    const text = await page.evaluate(() => document.body && document.body.innerText || '');
    try { return JSON.parse(text); } catch { return null; }
  } finally {
    try { await browser.close(); } catch {}
  }
}

function startServer(port, host) {
  const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    ensureDb();
    if (parsed.pathname === '/' || parsed.pathname === '/index.html') {
      const htmlPath = path.resolve(process.cwd(), 'public', 'index.html');
      if (fs.existsSync(htmlPath)) {
        try {
          const html = fs.readFileSync(htmlPath);
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
          res.end(html);
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('index.html okunamadı.');
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('index.html bulunamadı.');
      }
      return;
    }
    if (parsed.pathname && /^\/tiles\/(.+?)\/(.+?)\.png$/.test(parsed.pathname)) {
      const m = parsed.pathname.match(/^\/tiles\/(.+?)\/(.+?)\.png$/);
      const area = m && m[1] ? m[1] : '';
      const no = m && m[2] ? m[2] : '';
      const remoteUrl = `https://backend.wplace.live/files/s0/tiles/${encodeURIComponent(area)}/${encodeURIComponent(no)}.png`;
      try {
        https.get(remoteUrl, { agent: HTTPS_AGENT, headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'image/png,image/*;q=0.8,*/*;q=0.5' } }, (r) => {
          const status = r.statusCode || 0;
          if (status !== 200) {
            try { r.resume(); } catch {}
            res.writeHead(status === 404 ? 404 : 502, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Tile fetch failed');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' });
          r.pipe(res);
        }).on('error', () => {
          res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Tile fetch error');
        });
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Proxy error');
      }
      return;
    }
    
    
    if (parsed.pathname && /^\/api\/pixel\/([^\/]+)\/([^\/]+)$/.test(parsed.pathname) && req.method === 'POST') {
      const m = parsed.pathname.match(/^\/api\/pixel\/([^\/]+)\/([^\/]+)$/);
      const area = m && m[1] ? m[1] : '';
      const no = m && m[2] ? m[2] : '';
      readJsonBody(req).then(async (body) => {
        try {
          const colors = Array.isArray(body && body.colors) ? body.colors : [];
          const coords = Array.isArray(body && body.coords) ? body.coords : [];
          const t = body && typeof body.t === 'string' ? body.t : '';
          const jToken = body && typeof body.j === 'string' ? body.j : '';
          if (!colors.length || !coords.length || !t || !jToken) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'invalid payload' }));
            return;
          }
          const settings = readJson(SETTINGS_FILE, { cf_clearance: '' });
          const cf = settings && typeof settings.cf_clearance === 'string' ? settings.cf_clearance : '';
          const remotePath = `/s0/pixel/${encodeURIComponent(area)}/${encodeURIComponent(no)}`;
          const payload = JSON.stringify({ colors, coords, t });
          
          try {
            const gotScraping = await getGotScrapingFn();
            if (gotScraping) {
              debugLog('proxy pixel POST begin (got-scraping)', { path: remotePath });
              const r = await gotScraping({
                url: 'https://backend.wplace.live' + remotePath,
                method: 'POST',
                headers: {
                  'User-Agent': 'Mozilla/5.0',
                  'Accept': '*/*',
                  'Origin': 'https://wplace.live',
                  'Referer': 'https://wplace.live/',
                  'Content-Type': 'text/plain;charset=UTF-8',
                  'Cookie': `j=${jToken}; cf_clearance=${cf}`
                },
                body: payload,
                throwHttpErrors: false,
                decompress: true,
                agent: { https: HTTPS_AGENT },
                timeout: { request: 30000 }
              });
              const status = r && (r.statusCode || r.status) || 0;
              const text = r && (typeof r.body === 'string' ? r.body : (r.body ? String(r.body) : ''));
              debugLog('proxy pixel POST end (got-scraping)', { status, bodyPreview: String(text || '').slice(0, 300) });
              if (status >= 500) {
                try { deactivateAccountByToken(jToken); } catch {}
              }
              res.writeHead(status || 502, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(text);
              return;
            }
          } catch {}
          const options = {
            hostname: 'backend.wplace.live',
            port: 443,
            path: remotePath,
            method: 'POST',
            agent: HTTPS_AGENT,
            headers: {
              'User-Agent': 'Mozilla/5.0',
              'Accept': '*/*',
              'Origin': 'https://wplace.live',
              'Referer': 'https://wplace.live/',
              'Content-Type': 'text/plain;charset=UTF-8',
              'Cookie': `j=${jToken}; cf_clearance=${cf}`
            }
          };
          debugLog('proxy pixel POST begin', { path: remotePath, headers: { ...options.headers, Cookie: maskCookieHeader(options.headers.Cookie) } });
          const upstreamReq = https.request(options, (up) => {
            const chunks = [];
            up.on('data', (d) => chunks.push(d));
            up.on('end', () => {
              const encoding = ((up.headers && (up.headers['content-encoding'] || up.headers['Content-Encoding'])) || '').toLowerCase();
              let buf = Buffer.concat(chunks);
              if (encoding.includes('gzip')) { try { buf = zlib.gunzipSync(buf); } catch {} }
              else if (encoding.includes('deflate')) { try { buf = zlib.inflateRawSync(buf); } catch { try { buf = zlib.inflateSync(buf); } catch {} } }
              const text = buf.toString('utf8');
              const statusCode = up.statusCode || 0;
              debugLog('proxy pixel POST end', { status: statusCode, bodyPreview: text.slice(0, 300) });
              if (statusCode >= 500) {
                try { deactivateAccountByToken(jToken); } catch {}
              }
              res.writeHead(statusCode || 502, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(text);
            });
          });
          upstreamReq.on('error', (e) => {
            res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'upstream error', message: e && e.message ? e.message : String(e) }));
          });
          upstreamReq.write(payload);
          upstreamReq.end();
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'proxy failed' }));
        }
      }).catch(() => {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'invalid json' }));
      });
      return;
    }

    // Proxy purchase to backend.wplace.live
    if (parsed.pathname === '/api/purchase' && req.method === 'POST') {
      readJsonBody(req).then(async (body) => {
        try {
          const productIdRaw = body && body.productId;
          const amountRaw = body && body.amount;
          const variantRaw = body && body.variant;
          const jToken = body && typeof body.j === 'string' ? body.j : '';
          const productId = Number(productIdRaw);
          const amount = Math.max(1, Number(amountRaw || 1));
          const variant = (variantRaw == null ? null : Number(variantRaw));
          if (!Number.isFinite(productId) || productId <= 0 || !jToken) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'invalid payload' }));
            return;
          }
          const settings = readJson(SETTINGS_FILE, { cf_clearance: '' });
          const cf = settings && typeof settings.cf_clearance === 'string' ? settings.cf_clearance : '';
          if (!cf || cf.length < 30) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'cf_clearance missing' }));
            return;
          }
          const remotePath = '/purchase';
          const payloadObj = { product: { id: productId, amount: amount } };
          if (Number.isFinite(variant)) { payloadObj.product.variant = variant; }
          const payload = JSON.stringify(payloadObj);

          try {
            const gotScraping = await getGotScrapingFn();
            if (gotScraping) {
              debugLog('proxy purchase POST begin (got-scraping)', { path: remotePath, body: payload });
              const r = await gotScraping({
                url: 'https://backend.wplace.live' + remotePath,
                method: 'POST',
                headers: {
                  'User-Agent': 'Mozilla/5.0',
                  'Accept': 'application/json, text/plain, */*',
                  'Origin': 'https://wplace.live',
                  'Referer': 'https://wplace.live/',
                  'Content-Type': 'application/json',
                  'Cookie': `j=${jToken}; cf_clearance=${cf}`
                },
                body: payload,
                throwHttpErrors: false,
                decompress: true,
                agent: { https: HTTPS_AGENT },
                timeout: { request: 30000 }
              });
              const status = r && (r.statusCode || r.status) || 0;
              const text = r && (typeof r.body === 'string' ? r.body : (r.body ? String(r.body) : ''));
              debugLog('proxy purchase POST end (got-scraping)', { status, bodyPreview: String(text || '').slice(0, 300) });
              res.writeHead(status || 502, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(text);
              return;
            }
          } catch {}

          const options = {
            hostname: 'backend.wplace.live',
            port: 443,
            path: remotePath,
            method: 'POST',
            agent: HTTPS_AGENT,
            headers: {
              'User-Agent': 'Mozilla/5.0',
              'Accept': 'application/json, text/plain, */*',
              'Origin': 'https://wplace.live',
              'Referer': 'https://wplace.live/',
              'Content-Type': 'application/json',
              'Cookie': `j=${jToken}; cf_clearance=${cf}`
            }
          };
          debugLog('proxy purchase POST begin', { path: remotePath, headers: { ...options.headers, Cookie: maskCookieHeader(options.headers.Cookie) }, body: payload });
          const upstreamReq = https.request(options, (up) => {
            const chunks = [];
            up.on('data', (d) => chunks.push(d));
            up.on('end', () => {
              const encoding = ((up.headers && (up.headers['content-encoding'] || up.headers['Content-Encoding'])) || '').toLowerCase();
              let buf = Buffer.concat(chunks);
              if (encoding.includes('gzip')) { try { buf = zlib.gunzipSync(buf); } catch {} }
              else if (encoding.includes('deflate')) { try { buf = zlib.inflateRawSync(buf); } catch { try { buf = zlib.inflateSync(buf); } catch {} } }
              const text = buf.toString('utf8');
              const statusCode = up.statusCode || 0;
              debugLog('proxy purchase POST end', { status: statusCode, bodyPreview: text.slice(0, 300) });
              res.writeHead(statusCode || 502, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(text);
            });
          });
          upstreamReq.on('error', (e) => {
            res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'upstream error', message: e && e.message ? e.message : String(e) }));
          });
          upstreamReq.write(payload);
          upstreamReq.end();
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'proxy failed' }));
        }
      }).catch(() => {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'invalid json' }));
      });
      return;
    }
    
    if (parsed.pathname === '/api/accounts' && req.method === 'GET') {
      const accounts = readJson(ACCOUNTS_FILE, []);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(accounts));
      return;
    }
    
    if (parsed.pathname && parsed.pathname.startsWith('/api/accounts/') && req.method === 'DELETE') {
      const idStr = parsed.pathname.split('/').pop();
      const id = Number(idStr);
      const accounts = readJson(ACCOUNTS_FILE, []);
      const next = accounts.filter(a => a.id !== id);
      writeJson(ACCOUNTS_FILE, next);
      res.writeHead(204); res.end();
      return;
    }
    if (parsed.pathname && parsed.pathname.startsWith('/api/accounts/') && (req.method === 'PUT' || req.method === 'PATCH')) {
      const idStr = parsed.pathname.split('/').pop();
      const id = Number(idStr);
      readJsonBody(req).then((body) => {
        const accounts = readJson(ACCOUNTS_FILE, []);
        const idx = accounts.findIndex(a => a.id === id);
        if (idx === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'not found' }));
          return;
        }
        const updated = { ...accounts[idx] };
        if (typeof body.name === 'string') updated.name = body.name;
        if (typeof body.token === 'string') updated.token = body.token;
        if (body.pixelRight != null) updated.pixelRight = body.pixelRight;
        if (typeof body.active === 'boolean') updated.active = body.active;
        accounts[idx] = updated;
        writeJson(ACCOUNTS_FILE, accounts);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(updated));
      }).catch(() => {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'invalid json' }));
      });
      return;
    }
    if (parsed.pathname === '/api/settings' && req.method === 'GET') {
      const settings = readJson(SETTINGS_FILE, { cf_clearance: '', worldX: null, worldY: null });
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(settings));
      return;
    }
    if (parsed.pathname === '/api/settings' && req.method === 'POST') {
      readJsonBody(req).then((body) => {
        const existing = readJson(SETTINGS_FILE, { cf_clearance: '', worldX: null, worldY: null });
        const merged = { ...existing };
        if (body && Object.prototype.hasOwnProperty.call(body, 'cf_clearance') && typeof body.cf_clearance === 'string') {
          merged.cf_clearance = body.cf_clearance;
        }
        const worldX = (body && (typeof body.worldX === 'number' || body.worldX === null)) ? body.worldX : undefined;
        const worldY = (body && (typeof body.worldY === 'number' || body.worldY === null)) ? body.worldY : undefined;
        if (worldX !== undefined) merged.worldX = worldX;
        if (worldY !== undefined) merged.worldY = worldY;
        writeJson(SETTINGS_FILE, merged);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ cf_clearance: merged.cf_clearance }));
      }).catch(() => {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'invalid json' }));
      });
      return;
    }
    if (parsed.pathname === '/api/accounts' && req.method === 'POST') {
      readJsonBody(req).then(async (body) => {
        const name = (body && body.name) ? String(body.name) : '';
        const token = (body && body.token) ? String(body.token) : '';
        if (!name || !token) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'name and token required' }));
          return;
        }
        const accounts = readJson(ACCOUNTS_FILE, []);
        const account = { id: Date.now(), name, token, pixelCount: null, pixelMax: null, droplets: null, extraColorsBitmap: null, active: false };
        
        const settings = readJson(SETTINGS_FILE, { cf_clearance: '' });
        if (settings.cf_clearance && settings.cf_clearance.length >= 30) {
          try {
            const me = await fetchMe(settings.cf_clearance, token);
            if (me && me.charges) {
              account.pixelCount = Number(me.charges.count);
              account.pixelMax = Number(me.charges.max);
              account.active = true;
            }
            if (me && Object.prototype.hasOwnProperty.call(me, 'droplets')) {
              const d = Number(me.droplets);
              account.droplets = Number.isFinite(d) ? Math.floor(d) : null;
            }
            if (me && Object.prototype.hasOwnProperty.call(me, 'extraColorsBitmap')) {
              const b = Number(me.extraColorsBitmap);
              account.extraColorsBitmap = Number.isFinite(b) ? Math.floor(b) : null;
            }
            if (me && me.name && !name) account.name = String(me.name);
          } catch {}
        }
        accounts.push(account);
        writeJson(ACCOUNTS_FILE, accounts);
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(account));
      }).catch(() => {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'invalid json' }));
      });
      return;
    }
    if (parsed.pathname && /^\/api\/accounts\/\d+\/refresh$/.test(parsed.pathname) && req.method === 'POST') {
      const parts = parsed.pathname.split('/');
      const id = Number(parts[3]);
      const accounts = readJson(ACCOUNTS_FILE, []);
      const idx = accounts.findIndex(a => a.id === id);
      if (idx === -1) { res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify({ error: 'not found' })); return; }
      const settings = readJson(SETTINGS_FILE, { cf_clearance: '' });
      if (!settings.cf_clearance || settings.cf_clearance.length < 30) { res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify({ error: 'cf_clearance missing' })); return; }
      const acct = accounts[idx];
      (async () => {
        debugLog('refresh: begin got-scraping /me fetch', { accountId: id, name: acct && acct.name ? String(acct.name) : undefined });
        let me = null;
        try {
          me = await fetchMe(settings.cf_clearance, acct.token);
        } catch (err) {
          const msg = (err && err.message) ? String(err.message) : String(err);
          const code = (err && err.code) ? String(err.code) : '';
          if (!(code === 'ECONNRESET' || (msg && msg.toUpperCase && msg.toUpperCase().includes('ECONNRESET')))) {
            console.log('refresh fetch error:', msg);
          }
        }
        debugLog('refresh: got-scraping result', {
          ok: !!me,
          meta: me ? {
            name: me.name,
            charges: me.charges ? { count: me.charges.count, max: me.charges.max } : undefined,
            droplets: Object.prototype.hasOwnProperty.call(me, 'droplets') ? me.droplets : undefined,
            extraColorsBitmap: Object.prototype.hasOwnProperty.call(me, 'extraColorsBitmap') ? me.extraColorsBitmap : undefined
          } : null
        });
        if (me && me.charges) {
          
          acct.pixelCount = Math.floor(Number(me.charges.count));
          acct.pixelMax = Math.floor(Number(me.charges.max));
          acct.active = true;
        } else {
          acct.active = false;
        }
        if (me && Object.prototype.hasOwnProperty.call(me, 'droplets')) {
          const d = Number(me.droplets);
          acct.droplets = Number.isFinite(d) ? Math.floor(d) : null;
        }
        if (me && Object.prototype.hasOwnProperty.call(me, 'extraColorsBitmap')) {
          const b = Number(me.extraColorsBitmap);
          acct.extraColorsBitmap = Number.isFinite(b) ? Math.floor(b) : null;
        }
        accounts[idx] = acct;
        writeJson(ACCOUNTS_FILE, accounts);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(acct));
      })().catch(() => {
        res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'upstream error' }));
      });
      return;
    }
    
    const publicPath = path.resolve(process.cwd(), 'public');
    const tryFile = path.resolve(publicPath, '.' + parsed.pathname);
    if (tryFile.startsWith(publicPath) && fs.existsSync(tryFile) && fs.statSync(tryFile).isFile()) {
      const ext = path.extname(tryFile).toLowerCase();
      const type = ext === '.css' ? 'text/css' : ext === '.js' ? 'text/javascript' : ext === '.png' ? 'image/png' : 'application/octet-stream';
      try {
        const buf = fs.readFileSync(tryFile);
        res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
        res.end(buf);
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Dosya servis edilemedi.');
      }
      return;
    }
    if (parsed.pathname === '/favicon.ico') {
      res.writeHead(204); res.end(); return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  });
  server.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
  });
}

function main() {
  const args = process.argv.slice(2);
  
  let port = 3000;
  let host = 'localhost';
  let getMe = false;
  let cookieHeader = null;
  let cfOpt = null;
  let jOpt = null;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--get-me') getMe = true;
    else if (a.startsWith('--cookie=')) cookieHeader = a.slice('--cookie='.length);
    else if (a === '--cookie' && i + 1 < args.length) { cookieHeader = args[++i]; }
    else if (a.startsWith('--cf=')) cfOpt = a.slice('--cf='.length);
    else if (a === '--cf' && i + 1 < args.length) { cfOpt = args[++i]; }
    else if (a.startsWith('--j=')) jOpt = a.slice('--j='.length);
    else if (a === '--j' && i + 1 < args.length) { jOpt = args[++i]; }
    else if (a.startsWith('--port=')) port = parseInt(a.split('=')[1], 10) || port;
    else if (a === '--port' && i + 1 < args.length) { port = parseInt(args[++i], 10) || port; }
    else if (a.startsWith('--host=')) host = a.split('=')[1] || host;
  }

  if (getMe) {
    requestMeLikePython({ cookie: cookieHeader, cf_clearance: cfOpt, j: jOpt })
      .then(() => {})
      .catch((err) => {
        const msg = (err && err.message) ? String(err.message) : String(err);
        const code = (err && err.code) ? String(err.code) : '';
        if (!(code === 'ECONNRESET' || (msg && msg.toUpperCase && msg.toUpperCase().includes('ECONNRESET')))) {
          console.error('Request failed:', msg);
          process.exitCode = 1;
        }
      });
    return;
  }

  startServer(port, host);
}

if (require.main === module) {
  main();
}
