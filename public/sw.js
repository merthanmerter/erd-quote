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
  self.define = (n, c) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[i]) return
    let t = {}
    const r = (e) => a(e, i),
      o = { module: { uri: i }, exports: t, require: r }
    s[i] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (c(...e), t))
  }
}
define(['./workbox-5f5b08d6'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/U_LdSK2vvuz3FDDAsiClO/_buildManifest.js',
          revision: '184423d88902100186309a89d05cf7d8',
        },
        {
          url: '/_next/static/U_LdSK2vvuz3FDDAsiClO/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/259-04f1230fb0cb0ec7.js',
          revision: '04f1230fb0cb0ec7',
        },
        {
          url: '/_next/static/chunks/framework-4556c45dd113b893.js',
          revision: '4556c45dd113b893',
        },
        {
          url: '/_next/static/chunks/main-1b8097a3d05e58a1.js',
          revision: '1b8097a3d05e58a1',
        },
        {
          url: '/_next/static/chunks/pages/_app-3fb3e7469ee516e7.js',
          revision: '3fb3e7469ee516e7',
        },
        {
          url: '/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js',
          revision: 'a4ba2246ff8fb532',
        },
        {
          url: '/_next/static/chunks/pages/companies/companies-3c0812f4d5f74950.js',
          revision: '3c0812f4d5f74950',
        },
        {
          url: '/_next/static/chunks/pages/companies/companies/%5Bid%5D-2a17a5aa2db01dfb.js',
          revision: '2a17a5aa2db01dfb',
        },
        {
          url: '/_next/static/chunks/pages/companies/companies/projects/%5Bid%5D-812cb759c3471598.js',
          revision: '812cb759c3471598',
        },
        {
          url: '/_next/static/chunks/pages/companies/groups-93253cdb10d8611d.js',
          revision: '93253cdb10d8611d',
        },
        {
          url: '/_next/static/chunks/pages/companies/groups/%5Bid%5D-166e3905f0926211.js',
          revision: '166e3905f0926211',
        },
        {
          url: '/_next/static/chunks/pages/companies/industries-7a58a3c39ecc5563.js',
          revision: '7a58a3c39ecc5563',
        },
        {
          url: '/_next/static/chunks/pages/database/alloys-a1c50759eb3d3e5d.js',
          revision: 'a1c50759eb3d3e5d',
        },
        {
          url: '/_next/static/chunks/pages/database/colors-3c9c0b3073d5e3f2.js',
          revision: '3c9c0b3073d5e3f2',
        },
        {
          url: '/_next/static/chunks/pages/database/colors/%5Bid%5D-3674b3d3fa026b9f.js',
          revision: '3674b3d3fa026b9f',
        },
        {
          url: '/_next/static/chunks/pages/database/drawings-065ee13cce01cffe.js',
          revision: '065ee13cce01cffe',
        },
        {
          url: '/_next/static/chunks/pages/database/drawings/%5Bid%5D-908b2ec02802b654.js',
          revision: '908b2ec02802b654',
        },
        {
          url: '/_next/static/chunks/pages/database/molds-accf6dee31edcdb7.js',
          revision: 'accf6dee31edcdb7',
        },
        {
          url: '/_next/static/chunks/pages/database/molds/%5Bid%5D-0230de381e31b1e9.js',
          revision: '0230de381e31b1e9',
        },
        {
          url: '/_next/static/chunks/pages/database/surfaces-4553cab70c7eeea4.js',
          revision: '4553cab70c7eeea4',
        },
        {
          url: '/_next/static/chunks/pages/index-4bbdee52f37e4e8c.js',
          revision: '4bbdee52f37e4e8c',
        },
        {
          url: '/_next/static/chunks/pages/parts/manufactured-ebbe7f795dc8296c.js',
          revision: 'ebbe7f795dc8296c',
        },
        {
          url: '/_next/static/chunks/pages/parts/manufactured/%5Bid%5D-1b7e07fa1879da1f.js',
          revision: '1b7e07fa1879da1f',
        },
        {
          url: '/_next/static/chunks/pages/parts/purchased-6f4413ad9c7704da.js',
          revision: '6f4413ad9c7704da',
        },
        {
          url: '/_next/static/chunks/polyfills-0d1b80a048d4787e.js',
          revision: '40ccea369337cec877151c906f22814d',
        },
        {
          url: '/_next/static/chunks/webpack-69bfa6990bb9e155.js',
          revision: '69bfa6990bb9e155',
        },
        {
          url: '/_next/static/css/9d7ad88a5f531f99.css',
          revision: '9d7ad88a5f531f99',
        },
        { url: '/favicon.ico', revision: 'c30c7d42707a47a3f4591831641e50dc' },
        {
          url: '/icon-192x192.png',
          revision: '450d50bc8bb5a293dd9aee5ca3210048',
        },
        {
          url: '/icon-256x256.png',
          revision: '1936836c4ae2714fd7ae4b40fa142875',
        },
        {
          url: '/icon-384x384.png',
          revision: 'f24f0521e0a62f6ed2916031bdf9bbbd',
        },
        {
          url: '/icon-512x512.png',
          revision: '5c7bc92da6e2590c4693a19a9ce78f58',
        },
        { url: '/manifest.json', revision: '802a7208ef5a039ddd31056dd9ab7a2c' },
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
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
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
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
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
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
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
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    )
})
