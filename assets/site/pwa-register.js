(() => {
  if (!('serviceWorker' in navigator)) return;
  const scriptUrl = document.currentScript?.src;
  if (!scriptUrl) return;
  const appRoot = new URL('../../', scriptUrl);
  const workerUrl = new URL('sw.js', appRoot);
  navigator.serviceWorker.register(workerUrl, { scope: appRoot.pathname }).catch(() => {
    // The site remains fully usable when service workers are unavailable.
  });
})();
