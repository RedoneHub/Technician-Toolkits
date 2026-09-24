const CACHE_NAME = "technician-toolkit-v2;

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(names => {

            return Promise.all(

                names
                    .filter(name =>
                        name !== CACHE_NAME
                    )
                    .map(name =>
                        caches.delete(name)
                    )

            );

        })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                return cachedResponse ||
                       fetch(event.request);

            })

    );

});