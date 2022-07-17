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
      d = { module: { uri: t }, exports: i, require: r }
    s[t] = Promise.all(n.map((e) => d[e] || r(e))).then((e) => (c(...e), i))
  }
}
define(['./workbox-5f5b08d6'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/chunks/265-453b8fe2ca6a1c1f.js', revision: '453b8fe2ca6a1c1f' },
        { url: '/_next/static/chunks/392-f9d4cd563b3c3906.js', revision: 'f9d4cd563b3c3906' },
        { url: '/_next/static/chunks/787-7209f33c8aed6d11.js', revision: '7209f33c8aed6d11' },
        { url: '/_next/static/chunks/framework-4556c45dd113b893.js', revision: '4556c45dd113b893' },
        { url: '/_next/static/chunks/main-1b8097a3d05e58a1.js', revision: '1b8097a3d05e58a1' },
        { url: '/_next/static/chunks/pages/_app-a4a76a5ab7803e87.js', revision: 'a4a76a5ab7803e87' },
        { url: '/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js', revision: 'a4ba2246ff8fb532' },
        { url: '/_next/static/chunks/pages/companies/companies-18b3af1db9c3565c.js', revision: '18b3af1db9c3565c' },
        {
          url: '/_next/static/chunks/pages/companies/companies/%5Bid%5D-933d4171e607498a.js',
          revision: '933d4171e607498a',
        },
        { url: '/_next/static/chunks/pages/companies/groups-0c2d2b418bb9ecf2.js', revision: '0c2d2b418bb9ecf2' },
        {
          url: '/_next/static/chunks/pages/companies/groups/%5Bid%5D-49601b47d53997c0.js',
          revision: '49601b47d53997c0',
        },
        { url: '/_next/static/chunks/pages/companies/industries-525f98295f7cfb1a.js', revision: '525f98295f7cfb1a' },
        { url: '/_next/static/chunks/pages/database/alloys-b8deab366864f359.js', revision: 'b8deab366864f359' },
        { url: '/_next/static/chunks/pages/database/colors-c97b2f545f0e7ca6.js', revision: 'c97b2f545f0e7ca6' },
        {
          url: '/_next/static/chunks/pages/database/colors/%5Bid%5D-fb99ac6dc8a2c2d6.js',
          revision: 'fb99ac6dc8a2c2d6',
        },
        { url: '/_next/static/chunks/pages/database/drawings-105a069dee6c3c9e.js', revision: '105a069dee6c3c9e' },
        {
          url: '/_next/static/chunks/pages/database/drawings/%5Bid%5D-c84765667e905e57.js',
          revision: 'c84765667e905e57',
        },
        { url: '/_next/static/chunks/pages/database/molds-acf55c24136bca79.js', revision: 'acf55c24136bca79' },
        { url: '/_next/static/chunks/pages/database/molds/%5Bid%5D-073b8b2e5439d309.js', revision: '073b8b2e5439d309' },
        { url: '/_next/static/chunks/pages/database/surfaces-c940e66da6140e05.js', revision: 'c940e66da6140e05' },
        { url: '/_next/static/chunks/pages/index-758ddb01aac65dc1.js', revision: '758ddb01aac65dc1' },
        { url: '/_next/static/chunks/pages/inquiries/new-e6d84ea284adaef0.js', revision: 'e6d84ea284adaef0' },
        { url: '/_next/static/chunks/pages/parts/manufactured-e81fd98b531449aa.js', revision: 'e81fd98b531449aa' },
        {
          url: '/_next/static/chunks/pages/parts/manufactured/%5Bid%5D-042d73b0c4b08aa7.js',
          revision: '042d73b0c4b08aa7',
        },
        { url: '/_next/static/chunks/pages/parts/purchased-f53892b2c037514e.js', revision: 'f53892b2c037514e' },
        { url: '/_next/static/chunks/pages/projects/projects-bca2f4e1f05dd2d7.js', revision: 'bca2f4e1f05dd2d7' },
        {
          url: '/_next/static/chunks/pages/projects/projects/%5Bid%5D-ad5d2a6cc517c095.js',
          revision: 'ad5d2a6cc517c095',
        },
        { url: '/_next/static/chunks/polyfills-0d1b80a048d4787e.js', revision: '40ccea369337cec877151c906f22814d' },
        { url: '/_next/static/chunks/webpack-69bfa6990bb9e155.js', revision: '69bfa6990bb9e155' },
        { url: '/_next/static/css/4ce06b420d0a103d.css', revision: '4ce06b420d0a103d' },
        { url: '/_next/static/media/erd-metal-logo-white.58ca7461.png', revision: '18ff223d7a695735cd05ad525873f5ad' },
        { url: '/_next/static/ortMTddP9-mMRm7r0ba7w/_buildManifest.js', revision: 'f36879863e00940dbf82371c23d1988e' },
        { url: '/_next/static/ortMTddP9-mMRm7r0ba7w/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
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
