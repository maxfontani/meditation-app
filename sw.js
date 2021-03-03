const CACHE_NAME = 'static-v1'

const CONTENT_TO_CACHE = [
  '/video/beach.mp4',
  '/video/beach_large.mp4',
  '/video/poster_beach.png',
  '/video/poster_rain.jpg',
  '/video/poster_rain_large.jpg',
  '/video/rain.mp4',
  '/video/rain_large.mp4'
]

self.addEventListener('install', event => {
  console.log('Installing SW cache', CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CONTENT_TO_CACHE))
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(CACHE_NAME+' SW fetching resource: '+e.request.url)
      return r || fetch(e.request).then(response => {
        return response
      })
    })
  )}
)
      

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