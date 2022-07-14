/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')

const nextConfig = withPWA({
	reactStrictMode: true,
	output: 'standalone',
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === 'development',
	},
})

module.exports = nextConfig
