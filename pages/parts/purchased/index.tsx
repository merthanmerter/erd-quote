import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const purchased = await prisma['purchased'].findMany({})

	return {
		props: {
			purchased: JSON.stringify(purchased),
		},
	}
}

type Props = {
	purchased: any
}

const PurchasedParts: React.FC<Props> = (props) => {
	const deferredPurchased = useDeferredValue(JSON.parse(props.purchased))

	const columns = [
		{ id: 0, title: 'Manage' },
		{ id: 1, title: 'Code' },
		{ id: 2, title: 'Description' },
		{ id: 3, title: 'Cost/Unit (USD)' },
		{ id: 4, title: 'Unit' },
		{ id: 5, title: 'Created At' },
	]

	const rows = deferredPurchased.map((el: any, key: number) => (
		<tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
			<td className='p-2 flex gap-2'>
				<DeleteButton table='purchased' data={el} />
			</td>
			<td className='p-2'>{el.code}</td>
			<td className='p-2'>{el.description}</td>
			<td className='p-2'>{+el.cost}</td>
			<td className='p-2'>{el.unit}</td>
			<td className='p-2'>{new Date(el.createdAt).toLocaleDateString()}</td>
		</tr>
	))

	return (
		<>
			<Head>
				<title>Erd Metal - Purchased Parts</title>
			</Head>
			<main className='container'>
				<InputGroup
					data={{
						table: 'purchased',
						inputs: [
							{ id: 'code', label: 'Code', required: true },
							{ id: 'description', label: 'Description', required: true },
							{ id: 'cost', type: 'number', label: 'Cost (USD)' },
							{
								id: 'unit',
								label: 'Unit',
								required: true,
								autoComplete: true,
								acArray: [
									{ id: 0, name: 'pcs' },
									{ id: 1, name: 'm' },
									{ id: 2, name: 'kg' },
								],
							},
						],
					}}
				/>
				<Table columns={columns} rows={rows} />
			</main>
		</>
	)
}

export default PurchasedParts
