
(function injectPageHook() {
	try {
		const s = document.createElement('script');
		s.src = chrome.runtime.getURL('scripts/pageHook.js');
		s.async = false;
		(document.documentElement || document.head).appendChild(s);
		s.parentNode && s.parentNode.removeChild(s);
	} catch (e) {}
})();

window.addEventListener('message', function(ev) {
        if (!ev || !ev.data) return;
        const msg = ev.data;
        if (msg && msg.__wplace && msg.type === 'token_found' && msg.token) {
                try {
                        chrome.runtime.sendMessage({
                                type: 'wplace_token_found',
                                token: msg.token,
                                xpaw: msg.xpaw,
                                fp: msg.fp,
                                worldX: msg.worldX,
                                worldY: msg.worldY,
                        });
                } catch (e) {}
        }
});

(function syncToggle() {
	let wplaceEnabled = true;
	function syncEnabledToPage() {
		try { window.postMessage({ __wplace: true, type: 'toggle', enabled: !!wplaceEnabled }, '*'); } catch (e) {}
	}
	try {
		chrome.storage.local.get(['wplace_enabled'], function(result) {
			if (result && typeof result.wplace_enabled === 'boolean') {
				wplaceEnabled = result.wplace_enabled;
			}
			syncEnabledToPage();
		});
		chrome.storage.onChanged.addListener(function(changes, area) {
			if (area === 'local' && changes && Object.prototype.hasOwnProperty.call(changes, 'wplace_enabled')) {
				wplaceEnabled = !!changes.wplace_enabled.newValue;
				syncEnabledToPage();
			}
		});
	} catch (e) {}
})();


