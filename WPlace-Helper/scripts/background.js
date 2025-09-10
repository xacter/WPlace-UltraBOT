chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === 'wplace_token_found' && msg.token) {
    const toStore = { wplace_token: msg.token };
    if (msg.xpaw) toStore.wplace_xpaw_token = msg.xpaw;
    if (msg.worldX) toStore.wplace_world_x = String(msg.worldX);
    if (msg.worldY) toStore.wplace_world_y = String(msg.worldY);
    chrome.storage.local.set(toStore, () => {
      sendResponse({ ok: true });
    });
    // Also try to POST the token to local app for instant paste
    // Try localhost and 127.0.0.1, ignore errors
    const payloadObj = {
      token: String(msg.token),
      xpaw: msg.xpaw || null,
      fp: msg.fp || null,
      worldX: msg.worldX || null,
      worldY: msg.worldY || null,
    };
    const payload = JSON.stringify(payloadObj);
    const headers = { 'Content-Type': 'application/json' };
    try { fetch('http://localhost:3000/api/token', { method: 'POST', headers, body: payload, mode: 'no-cors' }).catch(() => {}); } catch (_) {}
    try { fetch('http://127.0.0.1:3000/api/token', { method: 'POST', headers, body: payload, mode: 'no-cors' }).catch(() => {}); } catch (_) {}
    return true;
  }
});


