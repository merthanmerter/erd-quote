import Head from 'next/head'

const PageHead = ({ title }: any) => {
	return (
		<Head>
			<title>ERD Quote - {title}</title>
			<meta name='description' content='Erd metal quotation application' />
			<link rel='icon' href='/favicon.ico' />
		</Head>
	)
}

export default PageHead
