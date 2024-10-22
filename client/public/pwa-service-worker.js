// Installation
self.addEventListener("install", event => {
    console.log("Service worker installing...");
    event.waitUntil(
        caches.open('static-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/public/images/icons/Plant_Pals_192.png',
                '/public/images/icons/Plant_Pals_512.png',
            ]);
        })
    );
    });

self.addEventListener("activate", event => {
    console.log("Service worker activating...");
    });

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        event.respondWith(
            caches.open('gql-cache').then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        if (networkResponse.ok) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );
    } else {
        event.respondWith(caches.match(event.request));
    }
});

// // Cache procedure for plant api
//     if (url.pathname.startsWith('/api/plants/search')) {
//     event.respondWith(
//         caches.open('plant-search-cache').then((cache) => { 
//             return cache.match(event.request).then((cachedResponse) => {
//                 const fetchPromise = fetch(event.request).then((networkResponse) => {
//                     cache.put(event.request, networkResponse.clone()); // Update cache with fresh response
//                     return networkResponse;
//                 });
//                 return cachedResponse || fetchPromise; // Serve cached, then update in background
//             });
//             })
//         );
//         }
//     });
//   event.respondWith(
//     caches.open('dynamic-cache').then((cache) => {
//       return cache.match(event.request).then((cachedResponse) => {
//         const fetchPromise = fetch(event.request).then((networkResponse) => {
//           cache.put(event.request, networkResponse.clone()); // Update cache with fresh response
//           return networkResponse;
//         });
//         return cachedResponse || fetchPromise; // Serve cached, then update in background
//       });
//     })
//   );

self.addEventListener('push', (event) => {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: "/public/images/icons/Plant_Pals_192.png",
        badge: "/public/images/icons/Plant_Pals_192.png",
    };

    event.waitUntil(
        self.ServiceWorkerRegistration.showNotification(data.title, options)
    );
});

// self.addEventListener('notificationclick', (event) => {
//     event.notifcation.close();
//     event.waitUntil(
//         self.clients.openWindow('http://localhost:3000')
//     );
// });