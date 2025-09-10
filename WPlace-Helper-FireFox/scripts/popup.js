document.addEventListener('DOMContentLoaded', function() {
  const tokenInput = document.getElementById('token-input');
  const copyButton = document.getElementById('copy-button');
  const statusDiv = document.getElementById('status');
  const cookieList = document.getElementById('cookie-list');
  const worldXInput = document.getElementById('world-x');
  const worldYInput = document.getElementById('world-y');
  const copyWorldX = document.getElementById('copy-world-x');
  const copyWorldY = document.getElementById('copy-world-y');
  const xpawInput = document.getElementById('xpaw-input');
  const copyXpaw = document.getElementById('copy-xpaw');
  const toggleCapture = document.getElementById('toggle-capture');
  const toggleWrap = document.getElementById('toggle-capture-wrap');
  const toggleLabel = document.getElementById('toggle-capture-label');

  const cfTokenInput = document.getElementById('cf-token-input');
  const cfCopyRefreshButton = document.getElementById('cf-copy-refresh-button');

  let activeCfCookie = null;
  let activeCfTabId = null;

  function setStatus(text) {
    if (!statusDiv) return;
    statusDiv.textContent = text || '';
    if (text) setTimeout(() => { if (statusDiv) statusDiv.textContent = ''; }, 2000);
  }

  chrome.storage.local.get(['wplace_token', 'wplace_xpaw_token', 'wplace_world_x', 'wplace_world_y'], function(result) {
    if (tokenInput && result && result.wplace_token) {
      tokenInput.value = result.wplace_token;
    }
    if (xpawInput && result && result.wplace_xpaw_token) {
      xpawInput.value = result.wplace_xpaw_token;
    }
    if (worldXInput) worldXInput.value = (result && result.wplace_world_x) ? result.wplace_world_x : '-';
    if (worldYInput) worldYInput.value = (result && result.wplace_world_y) ? result.wplace_world_y : '-';
  });

  chrome.storage.local.get(['wplace_enabled'], function(result) {
    const enabled = result && typeof result.wplace_enabled === 'boolean' ? result.wplace_enabled : true;
    if (toggleCapture) toggleCapture.checked = enabled;
    if (toggleWrap) toggleWrap.setAttribute('data-checked', String(!!enabled));
    if (toggleLabel) toggleLabel.textContent = enabled ? 'On' : 'Off';
  });

  chrome.storage.onChanged.addListener(function(changes, area) {
    if (!tokenInput) return;
    if (area === 'local' && changes && changes.wplace_token && tokenInput) {
      tokenInput.value = changes.wplace_token.newValue || 'No token captured yet...';
    }
    if (area === 'local' && changes && changes.wplace_xpaw_token && xpawInput) {
      xpawInput.value = changes.wplace_xpaw_token.newValue || 'No xpaw token captured yet...';
    }
    if (area === 'local' && (changes.wplace_world_x || changes.wplace_world_y)) {
      if (worldXInput && changes.wplace_world_x) {
        worldXInput.value = changes.wplace_world_x.newValue || '-';
      }
      if (worldYInput && changes.wplace_world_y) {
        worldYInput.value = changes.wplace_world_y.newValue || '-';
      }
    }
  });

  if (toggleCapture) {
    toggleCapture.addEventListener('change', function() {
      const enabled = !!toggleCapture.checked;
      if (toggleWrap) toggleWrap.setAttribute('data-checked', String(enabled));
      if (toggleLabel) toggleLabel.textContent = enabled ? 'On' : 'Off';
      chrome.storage.local.set({ wplace_enabled: enabled });
    });
  }

  if (copyButton) {
    copyButton.addEventListener('click', function() {
      if (!tokenInput) return;
      if (tokenInput.value && tokenInput.value !== 'No token captured yet...') {
        navigator.clipboard.writeText(tokenInput.value).then(function() {
          setStatus('Pixel token copied!');
          tokenInput.value = 'No token captured yet...';
          chrome.storage.local.remove('wplace_token');
        });
      }
    });
  }

  if (copyXpaw) {
    copyXpaw.addEventListener('click', function() {
      if (!xpawInput) return;
      if (xpawInput.value && xpawInput.value !== 'No xpaw token captured yet...') {
        navigator.clipboard.writeText(xpawInput.value).then(function() {
          setStatus('xpaw token copied!');
          xpawInput.value = 'No xpaw token captured yet...';
          chrome.storage.local.remove('wplace_xpaw_token');
        });
      }
    });
  }

  function valOrDash(v) { return (v && String(v).trim()) ? String(v).trim() : '-'; }

  if (copyWorldX) {
    copyWorldX.addEventListener('click', function() {
      const xVal = worldXInput ? worldXInput.value : '';
      const value = valOrDash(xVal);
      if (value !== '-') {
        navigator.clipboard.writeText(value).then(function() {
          setStatus('World X copied!');
        });
      }
    });
  }

  if (copyWorldY) {
    copyWorldY.addEventListener('click', function() {
      const yVal = worldYInput ? worldYInput.value : '';
      const value = valOrDash(yVal);
      if (value !== '-') {
        navigator.clipboard.writeText(value).then(function() {
          setStatus('World Y copied!');
        });
      }
    });
  }

  async function loadCfClearanceCookie() {
    if (!cfTokenInput || !cfCopyRefreshButton) return;
    
    activeCfCookie = null;
    activeCfTabId = null;
    cfCopyRefreshButton.disabled = true;
    cfTokenInput.value = "Searching...";

    const tabs = await chrome.tabs.query({ url: ["*://wplace.live/*", "*://*.wplace.live/*"] });

    if (tabs.length === 0) {
      cfTokenInput.value = "Open a wplace.live tab first";
      return;
    }
    
    for (const tab of tabs) {
      try {
        const foundCookies = await chrome.cookies.getAll({
          name: 'cf_clearance',
          domain: 'wplace.live',
          storeId: tab.cookieStoreId,
          partitionKey: {
            topLevelSite: "https://wplace.live"
          }
        });
        
        if (foundCookies.length > 0) {
          const cookie = foundCookies[0];
          cfTokenInput.value = cookie.value;
          cfCopyRefreshButton.disabled = false;
          activeCfCookie = { ...cookie, storeId: tab.cookieStoreId };
          activeCfTabId = tab.id;
          return;
        }
      } catch (e) {
        console.error(`Error checking cookies for tab ${tab.id}:`, e);
      }
    }
    
    cfTokenInput.value = "Not found in any tab";
  }

  if (cfCopyRefreshButton) {
    cfCopyRefreshButton.addEventListener('click', async function() {
      if (!activeCfCookie || !activeCfTabId) return;

      cfCopyRefreshButton.disabled = true;
      await navigator.clipboard.writeText(activeCfCookie.value);
      setStatus('Cloudflare token copied!');
      
      const cookieUrl = `https://${activeCfCookie.domain.startsWith('.') ? activeCfCookie.domain.substring(1) : activeCfCookie.domain}${activeCfCookie.path}`;
      
      await chrome.cookies.remove({
        url: cookieUrl,
        name: 'cf_clearance',
        storeId: activeCfCookie.storeId,
        partitionKey: {
          topLevelSite: "https://wplace.live"
        }
      });

      cfTokenInput.value = "Refreshing tab for new token...";
      chrome.tabs.reload(activeCfTabId);

      activeCfCookie = null;
      activeCfTabId = null;
      setTimeout(loadCfClearanceCookie, 3000);
    });
  }

  async function loadAllAccountCookies() {
    if (!cookieList) return;
    cookieList.innerHTML = '';
    try {
      if (!chrome.contextualIdentities) {
        cookieList.innerHTML = `<p style="font-size: 12px; color: var(--muted); margin: 4px 0;">This feature requires Firefox.</p>`;
        return;
      }
      const identities = await chrome.contextualIdentities.query({});
      const identityMap = new Map(identities.map(id => [id.cookieStoreId, id]));
      const storeIdsToCheck = identities.map(id => id.cookieStoreId);
      storeIdsToCheck.push("firefox-default");
      const cookiePromises = storeIdsToCheck.map(async (storeId) => {
        const foundCookies = await chrome.cookies.getAll({
          domain: 'backend.wplace.live', name: 'j', storeId: storeId
        });
        return foundCookies.map(cookie => ({ ...cookie, cookieStoreId: storeId }));
      });
      const results = await Promise.all(cookiePromises);
      const cookies = results.flat();
      if (cookies.length === 0) {
        cookieList.innerHTML = `<p style="font-size: 12px; color: var(--muted); margin: 4px 0;">No account tokens found.</p>`;
        return;
      }
      cookies.forEach(cookie => {
        const identity = identityMap.get(cookie.cookieStoreId);
        const containerName = identity ? identity.name : 'Default';
        const item = document.createElement('div');
        item.className = 'cookie-item';
        const cookieValue = cookie.value;
        item.innerHTML = `<div class="cookie-info"><span class="container-badge" title="${containerName}">${containerName}</span><input type="text" readonly value="${cookieValue}"></div><button class="btn btn-icon" title="Copy ${containerName} token"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 8.5A2.5 2.5 0 0 1 11.5 6h5A2.5 2.5 0 0 1 19 8.5v8A2.5 2.5 0 0 1 16.5 19h-5A2.5 2.5 0 0 1 9 16.5v-8Z" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 16.5A2.5 2.5 0 0 1 5 14V7.5A2.5 2.5 0 0 1 7.5 5H14" stroke="currentColor" stroke-width="1.5"/></svg><span>Copy</span></button>`;
        item.querySelector('button').addEventListener('click', () => {
          navigator.clipboard.writeText(cookieValue).then(() => {
            setStatus(`Token for '${containerName}' copied!`);
          });
        });
        cookieList.appendChild(item);
      });
    } catch (e) {
      console.error("Error loading cookies:", e);
      cookieList.innerHTML = `<p style="font-size: 12px; color: var(--muted); margin: 4px 0;">Error loading account tokens. Check console.</p>`;
    }
  }

  loadCfClearanceCookie();
  loadAllAccountCookies();

  //Account Syncing for automatic updating of accounts.
  const syncAccountsButton = document.getElementById('sync-accounts-button');

  if (syncAccountsButton) {
    syncAccountsButton.addEventListener('click', async () => {
      setStatus('Gathering container data...');
      syncAccountsButton.disabled = true;

      try {
        if (!chrome.contextualIdentities) {
          setStatus('Error: This feature requires Firefox.');
          return;
        }

        const identities = await chrome.contextualIdentities.query({});
        const containers = new Map(identities.map(id => [id.cookieStoreId, id.name]));
        const storeIds = identities.map(id => id.cookieStoreId);
        storeIds.push("firefox-default");

        const accountsToSync = [];

        for (const storeId of storeIds) {
          const containerName = containers.get(storeId) || 'Default';

          const [jCookieArr, cfCookieArr] = await Promise.all([
            chrome.cookies.getAll({ name: 'j', domain: 'backend.wplace.live', storeId: storeId }),
            chrome.cookies.getAll({ name: 'cf_clearance', domain: 'wplace.live', storeId: storeId, partitionKey: { topLevelSite: "https://wplace.live" } })
          ]);

          const accountToken = jCookieArr.length > 0 ? jCookieArr[0].value : null;
          const cfToken = cfCookieArr.length > 0 ? cfCookieArr[0].value : null;

          if (accountToken || cfToken) {
            accountsToSync.push({ name: containerName, token: accountToken, cf_clearance: cfToken });
          }
        }

        if (accountsToSync.length === 0) {
          setStatus('No accounts found in containers.');
          return;
        }

        const payload = JSON.stringify(accountsToSync);
        const headers = { 'Content-Type': 'application/json' };
        const endpoint = '/api/sync-accounts';
        const options = { method: 'POST', headers, body: payload, mode: 'no-cors' };

        try { fetch('http://localhost:3000' + endpoint, options).catch(() => {}); } catch (_) {}
        try { fetch('http://127.0.0.1:3000' + endpoint, options).catch(() => {}); } catch (_) {}
        setStatus('Sync signal sent to application!');

      } catch (error) {
        console.error('Sync failed:', error);
        setStatus('Error preparing sync data.');
      } finally {
        setTimeout(() => {
          syncAccountsButton.disabled = false;
        }, 1000);
      }
    });
  }
});