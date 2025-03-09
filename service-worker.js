const CACHE_NAME = 'calculadora-ingenieria-v1';
const ASSETS_TO_CACHE = [
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/index.html',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/styles.css',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/scripts.js',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/manifest.json',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-72x72.png',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-96x96.png',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-128x128.png',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-144x144.png',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-152x152.png',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-192x192.png',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-384x384.png',
  'https://codesiteweb.github.io/tools-calculadora_ingenieria/public/icons/icon-512x512.png'
];


// Instalación: cachea los archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activación: limpia caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepción de requests para servir desde caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Respuesta desde el caché
        }
        return fetch(event.request) // Intentar desde la red
          .catch(() => {
            // Manejo de errores: devolver un mensaje genérico
            if (event.request.destination === 'document') {
              return caches.match('index.html'); // Devuelve el archivo index.html
            }
            return new Response('Contenido no disponible sin conexión.', {
              status: 503,
              statusText: 'Servicio no disponible',
              headers: new Headers({ 'Content-Type': 'text/plain' })
            });
          });
      })
  );
});
