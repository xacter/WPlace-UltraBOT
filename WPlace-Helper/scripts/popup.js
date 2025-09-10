document.addEventListener('DOMContentLoaded', function() {
  const tokenInput = document.getElementById('token-input');
  const copyButton = document.getElementById('copy-button');
  const statusDiv = document.getElementById('status');
  const cookieJ = document.getElementById('cookie-j');
  const copyJ = document.getElementById('copy-j');
  const worldXInput = document.getElementById('world-x');
  const worldYInput = document.getElementById('world-y');
  const copyWorldX = document.getElementById('copy-world-x');
  const copyWorldY = document.getElementById('copy-world-y');
  const xpawInput = document.getElementById('xpaw-input');
  const copyXpaw = document.getElementById('copy-xpaw');
  const toggleCapture = document.getElementById('toggle-capture');
  const toggleWrap = document.getElementById('toggle-capture-wrap');
  const toggleLabel = document.getElementById('toggle-capture-label');

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

  function loadCookies() {
    if (!cookieJ) return;
    chrome.cookies.getAll({ domain: 'wplace.live' }, function(cookies) {
      try {
        const jCookie = (cookies || []).find(c => c && c.name === 'j');
        cookieJ.value = jCookie && jCookie.value ? jCookie.value : 'Not found';
      } catch (e) {
        cookieJ.value = 'Not found';
      }
    });
  }
  loadCookies();

  if (copyJ) {
    copyJ.addEventListener('click', function() {
      if (!cookieJ) return;
      if (cookieJ.value && cookieJ.value !== 'Not found') {
        navigator.clipboard.writeText(cookieJ.value).then(function() {
          setStatus('Account token copied!');
        });
      }
    });
  }
});


