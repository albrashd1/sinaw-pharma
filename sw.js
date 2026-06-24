/* Sinaw Pharma Book — service worker (app-shell cache; never caches the API) */
const CACHE = 'sinaw-shell-v10';
const SHELL = ['/', '/index.html', '/app.css', '/app.js', '/assets.js',
  '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;                    // uploads / API writes -> never cached
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          // API (Worker) + fonts -> straight to network
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      if (res.ok) caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match('/index.html')))
  );
});
