
(function () {
	let ENABLED = true; 
	const targetOrigin = 'https://backend.wplace.live';
	const targetPathPrefix = '/s0/pixel/';

	function postToken(token, worldX, worldY) {
		try {
			window.postMessage({ __wplace: true, type: 'token_found', token, worldX, worldY }, '*');
		} catch (e) {}
	}

	function isTarget(url) {
		return typeof url === 'string' && url.startsWith(targetOrigin) && url.includes(targetPathPrefix);
	}

	function extractWorldXY(url) {
		try {
			if (!isTarget(url)) return { x: null, y: null };
			const idx = url.indexOf(targetPathPrefix);
			if (idx === -1) return { x: null, y: null };
			const rest = url.slice(idx + targetPathPrefix.length);
			// Expect formats like "1188/767" possibly followed by query/hash
			const m = rest.match(/^(\d+)\/(\d+)/);
			if (!m) return { x: null, y: null };
			return { x: m[1], y: m[2] };
		} catch (_) {
			return { x: null, y: null };
		}
	}

	function decodeBodyToText(body) {
		if (!body) return Promise.resolve('');
		if (typeof body === 'string') return Promise.resolve(body);
		if (body instanceof Blob) return body.text();
		if (body instanceof URLSearchParams) return Promise.resolve(body.toString());
		try {
			if (body && typeof body === 'object') return Promise.resolve(JSON.stringify(body));
		} catch (e) {}
		return Promise.resolve('');
	}

	function tryExtractTokenFromText(text) {
		if (!text) return null;
		try {
			const obj = JSON.parse(text);
			if (obj && obj.t) return obj.t;
		} catch (_) {}
		try {
			const params = new URLSearchParams(text);
			const t = params.get('t');
			if (t) return t;
		} catch (_) {}
		return null;
	}

	try {
		window.addEventListener('message', function(ev) {
			const d = ev && ev.data;
			if (d && d.__wplace && d.type === 'toggle') {
				ENABLED = !!d.enabled;
			}
		});
	} catch (e) {}

	const originalFetch = window.fetch;
	window.fetch = async function(input, init) {
		const url = typeof input === 'string' ? input : (input && input.url);
		if (isTarget(url)) {
			try {
				if (ENABLED) {
					const body = init && init.body;
					const text = await decodeBodyToText(body);
					const token = tryExtractTokenFromText(text);
					const { x, y } = extractWorldXY(url);
					if (token) postToken(token, x, y);
				}
			} catch (e) {}
			if (ENABLED) {
				return new Response(null, { status: 204, statusText: 'No Content' });
			}
		}
		return originalFetch.apply(this, arguments);
	};

	const originalOpen = XMLHttpRequest.prototype.open;
	const originalSend = XMLHttpRequest.prototype.send;
	let lastUrl = null;
	XMLHttpRequest.prototype.open = function(method, url) {
		lastUrl = url;
		return originalOpen.apply(this, arguments);
	};
	XMLHttpRequest.prototype.send = function(body) {
		if (isTarget(lastUrl)) {
			try {
				if (ENABLED) {
					decodeBodyToText(body).then(text => {
						const token = tryExtractTokenFromText(text);
						const { x, y } = extractWorldXY(lastUrl);
						if (token) postToken(token, x, y);
					});
				}
			} catch (e) {}
		}
		return originalSend.apply(this, arguments);
	};

	const originalSendBeacon = navigator.sendBeacon ? navigator.sendBeacon.bind(navigator) : null;
	if (originalSendBeacon) {
		navigator.sendBeacon = function(url, data) {
			if (isTarget(url)) {
				try {
					if (ENABLED) {
						decodeBodyToText(data).then(text => {
							const token = tryExtractTokenFromText(text);
							const { x, y } = extractWorldXY(url);
							if (token) postToken(token, x, y);
						});
					}
				} catch (e) {}
				if (ENABLED) {
					return false;
				}
			}
			return originalSendBeacon.apply(this, arguments);
		};
	}
})();


