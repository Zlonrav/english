const CACHE_NAME = 'english-cards-v12';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data.js'
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

// ОБЯЗАТЕЛЬНЫЙ БЛОК ДЛЯ ОТВЕТА НА ЗАПРОС ВЕРСИИ
self.addEventListener('message', (event) => {
  if (event.data === 'GET_CACHE_NAME') {
    event.ports[0].postMessage(CACHE_NAME);
  }
});
