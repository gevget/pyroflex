const BUILD_ID = '__BUILD_ID__';
const CACHE_NAME = `pyroflex-${BUILD_ID}`;
const APP_ROOT = new URL('./', self.registration.scope);
const ROUTES = [
  'index.html', 'contacts.html', 'documents.html', 'partners.html', 'services.html', 'image-catalog.html',
  'en/index.html', 'en/contacts.html', 'en/documents.html', 'en/partners.html', 'en/services.html',
  'mk101/index.html', 'mk101/copy.html', 'privacy/index.html',
  'products/ultra.html', 'products/acrylic.html', 'products/base.html', 'products/finish.html', 'products/epoxy.html',
  'products/cable.html', 'products/therma-ultra.html', 'products/therma-epoxy.html',
  'products/system-t-ultra.html', 'products/system-t-epoxy.html',
  'site.webmanifest', 'assets/site/site.css', 'assets/site/site.js', 'assets/site/fonts.css',
  'assets/site/product-detail.css', 'assets/site/utility-pages.css', 'assets/site/document-index.js',
  'assets/site/pwa-register.js', 'assets/site/pyroflex-logo.svg', 'assets/site/icons/pwa-192.png',
  'assets/site/icons/pwa-512.png', 'mk101/assets/css/mk101.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const urls = [new URL('./', APP_ROOT), ...ROUTES.map((route) => new URL(route, APP_ROOT))];
    await cache.addAll(urls);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith('pyroflex-') && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== APP_ROOT.origin || !url.pathname.startsWith(APP_ROOT.pathname) || request.headers.has('range')) return;
  if (/\.pdf$/i.test(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(new Request(request, { cache: 'no-cache' }));
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        return await cache.match(request) || await cache.match(new URL('./', APP_ROOT)) || Response.error();
      }
    })());
    return;
  }

  if (!/\.(?:css|js|svg|png|jpe?g|webp|woff2?)$/i.test(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    const size = Number(response.headers.get('content-length') || 0);
    if (response.ok && (!size || size <= 5_000_000)) {
      await cache.put(request, response.clone());
      const keys = await cache.keys();
      const runtimeKeys = keys.filter((key) => !ROUTES.some((route) => new URL(route, APP_ROOT).href === key.url));
      for (const oldKey of runtimeKeys.slice(0, Math.max(0, runtimeKeys.length - 100))) await cache.delete(oldKey);
    }
    return response;
  })());
});
