const CACHE_NAME = 'english-cards-v16'; // Поднимаем версию
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data.js'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // СОХРАНЯЕМ ВЕРСИЮ В КЭШ
      caches.open('app-version').then(c => c.put('version', new Response(CACHE_NAME)));
      return cache.addAll(ASSETS);
    })
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
