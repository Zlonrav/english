const CACHE_NAME = 'english-cards-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Этот блок нужен для связи с index.html
self.addEventListener('message', (event) => {
  if (event.data === 'GET_CACHE_NAME') {
    event.ports[0].postMessage(CACHE_NAME);
  }
});
