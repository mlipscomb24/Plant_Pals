// Installation
const CACHE_VERSION = 'v0.6.0';
self.addEventListener("install", event => {
    console.log("Service worker installing...");
    event.waitUntil(
        caches.open(`static-cache-${CACHE_VERSION}`).then((cache) => {
            return cache.addAll([
                '/',
                '/images/icons/Plant_Pals_192.png',
                '/images/icons/Plant_Pals_512.png',
            ]);
        })
    );
    });

self.addEventListener("activate", event => {
    console.log("Service worker activating...");
    });

console.log('Service Worker Registration:', self.registration);

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (event.request.method === 'GET' && (url.pathname.startsWith('/public') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || fetch(event.request).then((response) => {
                        return caches.open(`static-cache-${CACHE_VERSION}`).then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                    });
                });
            })
        );
    } 
    else if (event.request.method === 'POST' && url.pathname.startsWith('/graphql')) {
        event.respondWith(fetch(event.request));

    }
    else {
        event.respondWith(fetch(event.request));
    }
});

self.addEventListener('push', (event) => {
    console.log(Notification.permission);  // Should be 'granted'
    console.log('Push event received:', event);
    const data = event.data.json();

    console.log('Push data:', data);
    const options = {
        body: data.body,
        icon: "/images/icons/Plant_Pals_192.png",
        badge: "/images/icons/Plant_Pals_192.png",
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.openWindow('/profile')
    );
});