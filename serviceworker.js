var cacheName = 'restaurant-reviews-v1';
var cacheFiles = [
	'/.',
	'/index.html',
	'/restaurant.html',
	'restaurant.html?id=1',
  	'restaurant.html?id=2',
  	'restaurant.html?id=3',
	'restaurant.html?id=4',
  	'restaurant.html?id=5',
  	'restaurant.html?id=6',
  	'restaurant.html?id=7',
 	'restaurant.html?id=8',
  	'restaurant.html?id=9',
  	'restaurant.html?id=10',
	'/css/styles.css',
	'/data/restaurants.json',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/registersw.js',
	'./img/1.jpg',
  	'./img/2.jpg',
 	'./img/3.jpg',
 	'./img/4.jpg',
 	'./img/5.jpg',
 	'./img/6.jpg',
 	'./img/7.jpg',
 	'./img/8.jpg',
 	'./img/9.jpg',
 	'./img/10.jpg',
 	'./img/favicon.png'
];

self.addEventListener('install', function(event){
	console.log('[ServiceWorker] installed')
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			console.log('[ServiceWorker] caching cacheFiles');
			return cache.addAll(cacheFiles);
		})
	);
});

self.addEventListener('activate', function(event){
	console.log('[ServiceWorker] activated')
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(cacheNames.filter(function(thisCacheName) {
				return thisCacheName.startsWith('restaurant-reviews-') &&
                        thisCacheName != cacheName;
					}).map(function (thisCacheName) {
                    return caches.delete(thisCacheName);
               		})
				);
			})
	);
});

self.addEventListener('fetch', function(event){
	console.log('[Service worker] fetching', event.request.url);
	event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  	);
});