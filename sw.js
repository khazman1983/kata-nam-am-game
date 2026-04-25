const cacheName = 'kata-nama-v5';
const assets = [
  './',
  './index.html',
  './style.css',
  './game.js',
  './manifest.json',
  './buku.png'
//Tambah semua laluan gambar di sini...
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
