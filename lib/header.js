const setHeaders = (req, res, method) => {
	const origin = req.headers.origin || req.headers.host
	const whitelist = process.env.WHITELIST

	if (whitelist.indexOf(origin) != -1) {
		res.setHeader('Access-Control-Allow-Origin', origin)
	}
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-setHeaders', [
		'Content-Type',
		'X-Requested-With',
		'X-HTTP-Method-Override',
		'Accept',
	])
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Methods', method)
	res.setHeader('Cache-Control', 'no-store,no-cache,must-revalidate')
	res.setHeader('Vary', 'Origin')
}

export default setHeaders
