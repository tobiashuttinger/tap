const cacheName = 'tap-offline-cache';
const urlsToCache = [
    '/',
    '/manifest.json',
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
    event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
    try {
        return await fetch(request);
    } catch(err) {
        const res = await caches.match(request)
        return res;
    }
}
