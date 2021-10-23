const ResponseEvents = {
    OK: 200,
    UserNotFound: 409,
    InternalError: 500,
    CookiesNotFound: 401,
};
const CACHE = 'HMEATSCache';

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', event => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches
                .open(CACHE)
                .then(cache => {
                    return cache.addAll(event.data.payload);
                })
                .catch(err => console.log(err))
        );
    }
    console.log('installed');
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
            return Promise.all(
                Array.from(cacheNames).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
    console.log('activated');
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    event.respondWith(
        caches
            .match(request)
            .then(async responseFromCache => {
                if (navigator.onLine) {
                    if (!url.href.includes(':5000')) {
                        const response = await fetch(request);
                        console.log(1);
                        const respCopy = response.clone();
                        caches
                            .open(CACHE)
                            .then(cache => cache.put(request, respCopy));
                        return response;
                    }
                    return fetch(request);
                }

                if (responseFromCache) {
                    return responseFromCache;
                }

                if (url.href.includes(':5000')) {
                    const data = { code: ResponseEvents.InternalError, explain: 'Нет интернетика, попробуйте позже:(' };
                    const body = new Blob([JSON.stringify(data)], { type: 'application/json' });

                    const status = {
                        status: ResponseEvents.OK
                    };
                    return new Response(body, status);
                } else {
                    const baseUrl = url.toString().replace(url.pathname, '/');
                    try {
                        const cache = await caches.open(CACHE);
                        const keys = await cache.keys();
                        const request = keys.find(key => key.url.toString() === baseUrl);
                        return await caches.match(request);
                    } catch (e) {
                        console.log(e);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    );
});

