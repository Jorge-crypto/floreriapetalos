var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/static/css/estilos_floreria.css',
    '/galeria',
    '/formulario',
    '/carrito',
    
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .then(function(result){
            return caches.open(CACHE_NAME)
            .then(function(c){
                c.put(event.request.url, result.clone());
                return result;
            })
        })
        .catch(function(e){
            return caches.match(event.request)
        })
    );
});

