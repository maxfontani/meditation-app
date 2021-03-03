const CACHE_NAME = 'static-v2'

const CONTENT_TO_CACHE = [
  '/video/beach.mp4',
  '/video/beach_large.mp4',
  '/video/poster_beach.png',
  '/video/poster_rain.jpg',
  '/video/poster_rain_large.jpg',
  '/video/rain.mp4',
  '/video/rain_large.mp4',
  '/sounds/beach.mp3',
  '/sounds/rain.mp3',
  '/offline.html'
]

self.addEventListener('install', event => {
  console.log('Installing SW cache', CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CONTENT_TO_CACHE)).catch(err => console.log(err))
  )
})

self.addEventListener('fetch', event => {

  // if (event.request.url === location.toString()) {
  //   event.respondWith(fetch(event.request.url) || caches.match('/offline.html'))
  // }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request.url).catch(err => console.log('ERR fetching network: ', event.request.url))
    })
    .catch(err => console.log(err))
  )
})
      
self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!CACHE_NAME.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('Old SW cache cleared');
    })
  );
});