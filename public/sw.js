const CACHE_NAME = 'buatincsv-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A simple pass-through fetch handler for now
  // Next.js handles its own routing and caching, we just need a fetch listener
  // to satisfy the PWA installation requirement on some browsers.
  event.respondWith(fetch(event.request));
});
