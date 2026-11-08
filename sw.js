const CACHE_NAME = 'anglomania-v1'; // Меняй версию при обновлении файлов (v1 -> v2)
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  
  // Твои JS файлы
  './data_british.js', // Важно! Судя по скриншоту, он лежит в корне
  './js/data.js',
  './js/tenses_data.js',
  './js/connect.js',
  './js/parent-config.js',
  './js/app.js',
  './js/constructor.js',
  './js/pet.js',
  './js/cycle.js',
  './js/parent.js',
  './js/trainer.js',
  './js/tasks.js',
  './js/quiz.js',
  './js/spelling.js',
  './js/neptune.js',
  './js/chits-content.js', // Файл читов

  // Дополнительные HTML страницы
  './save.html',
  './load.html',
  './rules.html',
  './cheats.html',

  // Картинки планет (добавь все, что есть в папке img/planets)
  './img/planets/earth.png',
  './img/planets/moon.png',
  './img/planets/mars.png',
  './img/planets/jupiter.png',
  './img/planets/saturn.png',
  './img/planets/uranus.png',
  './img/planets/neptune.png',
  './img/planets/kuiper-belt.png',
  './img/planets/oort-cloud.png',
  './img/planets/vega.png',
  './img/planets/ursa-major.png',
  './img/planets/andromeda.png',
  './img/planets/centaurus.png',
  
  // Основные ресурсы
  './img/ruble.png',
  './favicon.ico'
];

// Установка: скачиваем и кэшируем все файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование файлов...');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Сразу активируем новый SW
});

// Активация: удаляем старый кэш
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Стратегия Cache First (Сначала ищем в кэше, потом в сети)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если файл есть в кэше - отдаем его
        if (response) {
          return response;
        }
        // Если нет - качаем из сети
        return fetch(event.request).then(
          function(response) {
            // Проверяем, что ответ валидный
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // (Опционально) можно кэшировать новые картинки на лету
            return response;
          }
        );
      })
  );
});
