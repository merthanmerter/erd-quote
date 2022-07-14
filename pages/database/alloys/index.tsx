import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const alloys = await prisma['alloys'].findMany({})

	return {
		props: {
			alloys: JSON.stringify(alloys),
		},
	}
}

type Props = {
	alloys: any
}

const Alloys: React.FC<Props> = (props) => {
	const deferredAlloys = useDeferredValue(JSON.parse(props.alloys))

	const columns = [
		{ id: 0, title: 'Manage' },
		{ id: 1, title: 'Alloy' },
		{ id: 2, title: 'Description' },
		{ id: 4, title: 'Created At' },
	]

	const rows = deferredAlloys.map((el: any, key: number) => (
		<tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
			<td className='p-2 flex gap-2'>
				<DeleteButton table='alloys' data={el} />
			</td>
			<td className='p-2'>{el.alloy}</td>
			<td className='p-2'>{el.description}</td>
			<td className='p-2'>{new Date(el.createdAt).toLocaleDateString()}</td>
		</tr>
	))

	return (
		<>
			<Head>
				<title>Erd Metal - Alloys</title>
			</Head>
			<main className='container'>
				<InputGroup
					data={{
						table: 'alloys',
						inputs: [
							{ id: 'alloy', label: 'Alloy', required: true },
							{ id: 'description', label: 'Description', required: true },
						],
					}}
				/>
				<Table columns={columns} rows={rows} />
			</main>
		</>
	)
}

export default Alloys
