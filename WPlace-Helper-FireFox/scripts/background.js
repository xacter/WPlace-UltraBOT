chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === 'wplace_token_found' && msg.token) {
    const toStore = { wplace_token: msg.token };
    if (msg.worldX) toStore.wplace_world_x = String(msg.worldX);
    if (msg.worldY) toStore.wplace_world_y = String(msg.worldY);
    chrome.storage.local.set(toStore, () => {
      sendResponse({ ok: true });
    });
    return true;
  }
});


