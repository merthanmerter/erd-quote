if (!self.define) {
  let e,
    s = {}
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = a), (e.onload = s), document.head.appendChild(e)
        } else (e = a), importScripts(a), s()
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (n, i) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[t]) return
    let c = {}
    const r = (e) => a(e, t),
      o = { module: { uri: t }, exports: c, require: r }
    s[t] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (i(...e), c))
  }
}
define(['./workbox-5f5b08d6'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/3_SHQqKyKpRtNs5aNi7XY/_buildManifest.js', revision: 'a51cf8ce8cfa1002e3d8cdd16fdc5401' },
        { url: '/_next/static/3_SHQqKyKpRtNs5aNi7XY/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/chunks/259-ab86ca6671d47826.js', revision: 'ab86ca6671d47826' },
        { url: '/_next/static/chunks/framework-4556c45dd113b893.js', revision: '4556c45dd113b893' },
        { url: '/_next/static/chunks/main-1b8097a3d05e58a1.js', revision: '1b8097a3d05e58a1' },
        { url: '/_next/static/chunks/pages/_app-7e075a837bf359cd.js', revision: '7e075a837bf359cd' },
        { url: '/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js', revision: 'a4ba2246ff8fb532' },
        { url: '/_next/static/chunks/pages/companies/companies-c9358c80feb5a054.js', revision: 'c9358c80feb5a054' },
        {
          url: '/_next/static/chunks/pages/companies/companies/%5Bid%5D-dbe7f5e01188b86d.js',
          revision: 'dbe7f5e01188b86d',
        },
        {
          url: '/_next/static/chunks/pages/companies/companies/projects/%5Bid%5D-dc09200863b0a39d.js',
          revision: 'dc09200863b0a39d',
        },
        { url: '/_next/static/chunks/pages/companies/groups-8e870847373e1f64.js', revision: '8e870847373e1f64' },
        {
          url: '/_next/static/chunks/pages/companies/groups/%5Bid%5D-166e3905f0926211.js',
          revision: '166e3905f0926211',
        },
        { url: '/_next/static/chunks/pages/companies/industries-3f54f5701715ae24.js', revision: '3f54f5701715ae24' },
        { url: '/_next/static/chunks/pages/database/alloys-59de0b2135d82d90.js', revision: '59de0b2135d82d90' },
        { url: '/_next/static/chunks/pages/database/colors-58226e985db212f3.js', revision: '58226e985db212f3' },
        {
          url: '/_next/static/chunks/pages/database/colors/%5Bid%5D-5d05c3b5878f418f.js',
          revision: '5d05c3b5878f418f',
        },
        { url: '/_next/static/chunks/pages/database/drawings-abaeb036629c1626.js', revision: 'abaeb036629c1626' },
        {
          url: '/_next/static/chunks/pages/database/drawings/%5Bid%5D-908b2ec02802b654.js',
          revision: '908b2ec02802b654',
        },
        { url: '/_next/static/chunks/pages/database/molds-4fab78ddd46175ab.js', revision: '4fab78ddd46175ab' },
        { url: '/_next/static/chunks/pages/database/molds/%5Bid%5D-bcaa5efc953d5ea1.js', revision: 'bcaa5efc953d5ea1' },
        { url: '/_next/static/chunks/pages/database/surfaces-43cf2e6f200066a9.js', revision: '43cf2e6f200066a9' },
        { url: '/_next/static/chunks/pages/index-4bbdee52f37e4e8c.js', revision: '4bbdee52f37e4e8c' },
        { url: '/_next/static/chunks/pages/inquiries/new-760f32c0ab78fe67.js', revision: '760f32c0ab78fe67' },
        { url: '/_next/static/chunks/pages/parts/manufactured-a7d7f36393e7af9e.js', revision: 'a7d7f36393e7af9e' },
        {
          url: '/_next/static/chunks/pages/parts/manufactured/%5Bid%5D-1b7e07fa1879da1f.js',
          revision: '1b7e07fa1879da1f',
        },
        { url: '/_next/static/chunks/pages/parts/purchased-9d75e2a3483ff044.js', revision: '9d75e2a3483ff044' },
        { url: '/_next/static/chunks/polyfills-0d1b80a048d4787e.js', revision: '40ccea369337cec877151c906f22814d' },
        { url: '/_next/static/chunks/webpack-69bfa6990bb9e155.js', revision: '69bfa6990bb9e155' },
        { url: '/_next/static/css/8eb5e5e2cb1622e7.css', revision: '8eb5e5e2cb1622e7' },
        { url: '/favicon.ico', revision: 'c30c7d42707a47a3f4591831641e50dc' },
        { url: '/icon-192x192.png', revision: '450d50bc8bb5a293dd9aee5ca3210048' },
        { url: '/icon-256x256.png', revision: '1936836c4ae2714fd7ae4b40fa142875' },
        { url: '/icon-384x384.png', revision: 'f24f0521e0a62f6ed2916031bdf9bbbd' },
        { url: '/icon-512x512.png', revision: '5c7bc92da6e2590c4693a19a9ce78f58' },
        { url: '/manifest.json', revision: 'fdb3115e3e76bfb35b73378859ac2a70' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: n }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    )
})
