const CACHE_NAME = 'anglomania-v1';
const urlsToCache = [
  '/english/',
  '/english/index.html',
  '/english/css/styles.css',
  '/english/js/app.js',
  '/english/js/data.js',
  '/english/js/pet.js',
  '/english/js/neptune.js',
  '/english/img/planets/earth.png',
  '/english/img/planets/moon.png',
  // ... добавь сюда все важные файлы и картинки
];

// Установка и кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Активировать новый SW сразу
});

// Перехват запросов и выдача из кэша
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Удаление старого кэша при обновлении
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});
