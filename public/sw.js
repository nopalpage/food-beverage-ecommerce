// public/sw.js
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('freshmart-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/products',
        '/cart',
        '/offline',
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => caches.match('/offline'));
    })
  );
});
