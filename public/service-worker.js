const CACHE_NAME = 'tts-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
];

// Install cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

// clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        )
    );
    self.clients.claim();
});

// serve cached content when offline - wont work with this API since it needs to be online to send requests but idk if its required so Im leaving the idea
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request)
        )
    );
});