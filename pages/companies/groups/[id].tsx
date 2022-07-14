import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query,
}) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=43200, stale-while-revalidate=60'
	)

	const id: any = query.id!

	const array = await prisma.groups.findUnique({
		where: { id: id },
	})

	return {
		props: {
			array: JSON.stringify(array),
		},
	}
}

type Props = {
	array: any
}

const Group: React.FC<Props> = (props) => {
	const [array, setArray] = React.useState<any>({
		id: '',
		createdAt: '',
		company: '',
	})

	React.useEffect(() => {
		setArray(JSON.parse(props.array))
	}, [props])

	return (
		<main className='container'>
			<h1 className='uppercase'>{array.id}</h1>
		</main>
	)
}

export default Group
