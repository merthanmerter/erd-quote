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
  self.define = (n, t) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[i]) return
    let c = {}
    const r = (e) => a(e, i),
      o = { module: { uri: i }, exports: c, require: r }
    s[i] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (t(...e), c))
  }
}
define(['./workbox-5f5b08d6'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/2RxsfLUApkaepTyRnZo14/_buildManifest.js', revision: 'ac689afbc7f662d8b5441b5721a65650' },
        { url: '/_next/static/2RxsfLUApkaepTyRnZo14/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/chunks/135-57014ce3bd35fee4.js', revision: '57014ce3bd35fee4' },
        { url: '/_next/static/chunks/819-ea048800071abc03.js', revision: 'ea048800071abc03' },
        { url: '/_next/static/chunks/framework-4556c45dd113b893.js', revision: '4556c45dd113b893' },
        { url: '/_next/static/chunks/main-1b8097a3d05e58a1.js', revision: '1b8097a3d05e58a1' },
        { url: '/_next/static/chunks/pages/_app-a4a76a5ab7803e87.js', revision: 'a4a76a5ab7803e87' },
        { url: '/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js', revision: 'a4ba2246ff8fb532' },
        { url: '/_next/static/chunks/pages/companies/companies-7915956fd6e3cb71.js', revision: '7915956fd6e3cb71' },
        {
          url: '/_next/static/chunks/pages/companies/companies/%5Bid%5D-9a543d51d1b0d881.js',
          revision: '9a543d51d1b0d881',
        },
        { url: '/_next/static/chunks/pages/companies/groups-ce36df25fe1a1178.js', revision: 'ce36df25fe1a1178' },
        {
          url: '/_next/static/chunks/pages/companies/groups/%5Bid%5D-881e9c9475954899.js',
          revision: '881e9c9475954899',
        },
        { url: '/_next/static/chunks/pages/companies/industries-253035064f38a7ff.js', revision: '253035064f38a7ff' },
        { url: '/_next/static/chunks/pages/database/alloys-d0acc8521d03f0df.js', revision: 'd0acc8521d03f0df' },
        { url: '/_next/static/chunks/pages/database/colors-71a93f4f316f2999.js', revision: '71a93f4f316f2999' },
        {
          url: '/_next/static/chunks/pages/database/colors/%5Bid%5D-f44a3b880c0a5e8e.js',
          revision: 'f44a3b880c0a5e8e',
        },
        { url: '/_next/static/chunks/pages/database/drawings-d392b7dd58bdc43e.js', revision: 'd392b7dd58bdc43e' },
        {
          url: '/_next/static/chunks/pages/database/drawings/%5Bid%5D-71f11cbf2007a143.js',
          revision: '71f11cbf2007a143',
        },
        { url: '/_next/static/chunks/pages/database/molds-aa2ee9170f54928f.js', revision: 'aa2ee9170f54928f' },
        { url: '/_next/static/chunks/pages/database/molds/%5Bid%5D-5391b1291d12c489.js', revision: '5391b1291d12c489' },
        { url: '/_next/static/chunks/pages/database/surfaces-beada677e6da9243.js', revision: 'beada677e6da9243' },
        { url: '/_next/static/chunks/pages/index-8329fa7ea2b6d6dd.js', revision: '8329fa7ea2b6d6dd' },
        { url: '/_next/static/chunks/pages/inquiries/new-500a30907eff0562.js', revision: '500a30907eff0562' },
        { url: '/_next/static/chunks/pages/parts/manufactured-fa5fd1f90adc32fb.js', revision: 'fa5fd1f90adc32fb' },
        {
          url: '/_next/static/chunks/pages/parts/manufactured/%5Bid%5D-eff5f85f92b7fd2d.js',
          revision: 'eff5f85f92b7fd2d',
        },
        { url: '/_next/static/chunks/pages/parts/purchased-0e97b6df05861d08.js', revision: '0e97b6df05861d08' },
        { url: '/_next/static/chunks/pages/projects/projects-dd49a2129c1d8657.js', revision: 'dd49a2129c1d8657' },
        {
          url: '/_next/static/chunks/pages/projects/projects/%5Bid%5D-b7e772ecb3288200.js',
          revision: 'b7e772ecb3288200',
        },
        { url: '/_next/static/chunks/polyfills-0d1b80a048d4787e.js', revision: '40ccea369337cec877151c906f22814d' },
        { url: '/_next/static/chunks/webpack-69bfa6990bb9e155.js', revision: '69bfa6990bb9e155' },
        { url: '/_next/static/css/8bb97dc41dab99c1.css', revision: '8bb97dc41dab99c1' },
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
