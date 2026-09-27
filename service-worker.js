/* ============================================================
   TECHNICIAN TOOLKIT — SERVICE WORKER
   VERSION 8.1
   Strategy:
     - App shell (HTML/CSS/JS/icons): cache-first, update in background
     - Everything else: network-first with cache fallback
     - Offline fallback: cached index.html
============================================================ */

const CACHE_NAME = "technician-toolkit-v8.1";
const RUNTIME_CACHE = "technician-toolkit-runtime-v8.1";

/* Files required for the app to run offline */
const PRECACHE_URLS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

/* ============================================================
   INSTALL — Precache app shell
============================================================ */

self.addEventListener("install", (event) => {
    console.log("[SW] Installing version:", CACHE_NAME);

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log("[SW] Pre-caching app shell");
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                // Activate immediately without waiting for old tabs to close
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error("[SW] Pre-cache failed:", error);
            })
    );
});

/* ============================================================
   ACTIVATE — Clean up old caches
============================================================ */

self.addEventListener("activate", (event) => {
    console.log("[SW] Activating version:", CACHE_NAME);

    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (
                            cacheName !== CACHE_NAME &&
                            cacheName !== RUNTIME_CACHE
                        ) {
                            console.log("[SW] Deleting old cache:", cacheName);
                            return caches.delete(cacheName);
                        }
                        return null;
                    })
                );
            })
            .then(() => {
                // Take control of all open pages immediately
                return self.clients.claim();
            })
    );
});

/* ============================================================
   FETCH — Serve cached content first, fall back to network
============================================================ */

self.addEventListener("fetch", (event) => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== "GET") {
        return;
    }

    // Skip cross-origin requests (analytics, external CDNs, etc.)
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) {
        return;
    }

    // Skip browser extension / chrome-extension requests
    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return;
    }

    // Handle navigation requests (HTML pages) — network first, fallback to cache
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Update cache with fresh HTML
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put("./index.html", copy);
                    });
                    return response;
                })
                .catch(() => {
                    // Offline — serve cached index.html
                    return caches.match("./index.html").then((cached) => {
                        return cached || caches.match("./");
                    });
                })
        );
        return;
    }

    // Handle static assets — cache first, then network
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Serve from cache, but refresh in background
                event.waitUntil(
                    fetch(request)
                        .then((networkResponse) => {
                            if (
                                networkResponse &&
                                networkResponse.status === 200
                            ) {
                                return caches
                                    .open(RUNTIME_CACHE)
                                    .then((cache) => {
                                        cache.put(request, networkResponse.clone());
                                    });
                            }
                            return null;
                        })
                        .catch(() => {
                            // Network failed — that's fine, we have cache
                            return null;
                        })
                );

                return cachedResponse;
            }

            // Not in cache — fetch from network and cache it
            return fetch(request)
                .then((networkResponse) => {
                    // Don't cache non-OK responses
                    if (
                        !networkResponse ||
                        networkResponse.status !== 200 ||
                        networkResponse.type === "opaque"
                    ) {
                        return networkResponse;
                    }

                    const copy = networkResponse.clone();
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(request, copy);
                    });

                    return networkResponse;
                })
                .catch(() => {
                    // Offline and not cached — return nothing graceful
                    return new Response(
                        "Offline — resource not available.",
                        {
                            status: 503,
                            statusText: "Service Unavailable",
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        }
                    );
                });
        })
    );
});

/* ============================================================
   MESSAGE — Allow app to trigger SW update
============================================================ */

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

/* ============================================================
   PUSH (optional placeholder for future features)
============================================================ */

self.addEventListener("push", (event) => {
    if (!event.data) return;

    let payload = {};

    try {
        payload = event.data.json();
    } catch (e) {
        payload = { title: "Technician Toolkit", body: event.data.text() };
    }

    const title = payload.title || "Technician Toolkit";
    const options = {
        body: payload.body || "You have a new notification.",
        icon: "./icon-192.png",
        badge: "./icon-192.png",
        tag: payload.tag || "tech-toolkit",
        data: payload.data || {}
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

/* ============================================================
   NOTIFICATION CLICK
============================================================ */

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                // Focus existing window if open
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin)) {
                        return client.focus();
                    }
                }
                // Otherwise open a new one
                if (clients.openWindow) {
                    return clients.openWindow("./index.html");
                }
                return null;
            })
    );
});