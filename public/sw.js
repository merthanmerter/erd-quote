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
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[t]) return
    let i = {}
    const r = (e) => a(e, t),
      o = { module: { uri: t }, exports: i, require: r }
    s[t] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (c(...e), i))
  }
}
define(['./workbox-5f5b08d6'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/GbxGHdCoP8Qm-bX6zeton/_buildManifest.js', revision: '47a5f847405fd01fa3f8846846265054' },
        { url: '/_next/static/GbxGHdCoP8Qm-bX6zeton/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
        { url: '/_next/static/chunks/392-f9d4cd563b3c3906.js', revision: 'f9d4cd563b3c3906' },
        { url: '/_next/static/chunks/691-d1512fb499894c65.js', revision: 'd1512fb499894c65' },
        { url: '/_next/static/chunks/819-ea048800071abc03.js', revision: 'ea048800071abc03' },
        { url: '/_next/static/chunks/framework-4556c45dd113b893.js', revision: '4556c45dd113b893' },
        { url: '/_next/static/chunks/main-1b8097a3d05e58a1.js', revision: '1b8097a3d05e58a1' },
        { url: '/_next/static/chunks/pages/_app-a4a76a5ab7803e87.js', revision: 'a4a76a5ab7803e87' },
        { url: '/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js', revision: 'a4ba2246ff8fb532' },
        { url: '/_next/static/chunks/pages/companies/companies-cc527d07ef9520d8.js', revision: 'cc527d07ef9520d8' },
        {
          url: '/_next/static/chunks/pages/companies/companies/%5Bid%5D-f5bffd6855d03bcf.js',
          revision: 'f5bffd6855d03bcf',
        },
        { url: '/_next/static/chunks/pages/companies/groups-a848e2e209ffdc7c.js', revision: 'a848e2e209ffdc7c' },
        {
          url: '/_next/static/chunks/pages/companies/groups/%5Bid%5D-0e74c8e95562f9c9.js',
          revision: '0e74c8e95562f9c9',
        },
        { url: '/_next/static/chunks/pages/companies/industries-62a80e262f170b6d.js', revision: '62a80e262f170b6d' },
        { url: '/_next/static/chunks/pages/database/alloys-1790505788e502ed.js', revision: '1790505788e502ed' },
        { url: '/_next/static/chunks/pages/database/colors-75b6a8e2b3c9bc4e.js', revision: '75b6a8e2b3c9bc4e' },
        {
          url: '/_next/static/chunks/pages/database/colors/%5Bid%5D-006675f8f444de20.js',
          revision: '006675f8f444de20',
        },
        { url: '/_next/static/chunks/pages/database/drawings-265345ac0c7768ff.js', revision: '265345ac0c7768ff' },
        {
          url: '/_next/static/chunks/pages/database/drawings/%5Bid%5D-3eed99b2f1732832.js',
          revision: '3eed99b2f1732832',
        },
        { url: '/_next/static/chunks/pages/database/molds-190d1642cb6205c8.js', revision: '190d1642cb6205c8' },
        { url: '/_next/static/chunks/pages/database/molds/%5Bid%5D-1fd2e7bee3e3aa37.js', revision: '1fd2e7bee3e3aa37' },
        { url: '/_next/static/chunks/pages/database/surfaces-928ca75bb09b6144.js', revision: '928ca75bb09b6144' },
        { url: '/_next/static/chunks/pages/index-7dc958f21304a762.js', revision: '7dc958f21304a762' },
        { url: '/_next/static/chunks/pages/inquiries/new-efb42065c214d2f5.js', revision: 'efb42065c214d2f5' },
        { url: '/_next/static/chunks/pages/parts/manufactured-edff772e3cfeed79.js', revision: 'edff772e3cfeed79' },
        {
          url: '/_next/static/chunks/pages/parts/manufactured/%5Bid%5D-d2a73cc07c56c93f.js',
          revision: 'd2a73cc07c56c93f',
        },
        { url: '/_next/static/chunks/pages/parts/purchased-1f0fd5c45ef9392a.js', revision: '1f0fd5c45ef9392a' },
        { url: '/_next/static/chunks/pages/projects/projects-b71456f5d0d967fd.js', revision: 'b71456f5d0d967fd' },
        {
          url: '/_next/static/chunks/pages/projects/projects/%5Bid%5D-ccae2a45b464bf3a.js',
          revision: 'ccae2a45b464bf3a',
        },
        { url: '/_next/static/chunks/polyfills-0d1b80a048d4787e.js', revision: '40ccea369337cec877151c906f22814d' },
        { url: '/_next/static/chunks/webpack-69bfa6990bb9e155.js', revision: '69bfa6990bb9e155' },
        { url: '/_next/static/css/280d9cf12a0b297f.css', revision: '280d9cf12a0b297f' },
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
