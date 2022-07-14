import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='manifest' href='/manifest.json' />
				<link rel='apple-touch-icon' href='/icon.png' />
				<link rel='theme-color' href='#4a4a4a' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
