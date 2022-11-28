const cacheName = 'tap-offline-cache';
var urlsToCache = [
    '/',
    '/js/main.js',
    '/css/main.css',
    '/img/tap.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            caches.match(event.request).then((response) => {
                return response;
            });
        })
    )
});