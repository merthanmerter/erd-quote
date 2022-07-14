import Button from '@components/button'
import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const molds = await prisma['molds'].findMany({
		include: { companies: true },
	})
	const companies = await prisma['companies'].findMany({})

	return {
		props: {
			molds: JSON.stringify(molds),
			companies: JSON.stringify(companies),
		},
	}
}

type Props = {
	molds: any
	companies: any
}

const Molds: React.FC<Props> = (props) => {
	const deferredMolds = useDeferredValue(JSON.parse(props.molds))
	const deferredCompanies = useDeferredValue(JSON.parse(props.companies))

	const columns = [
		{ id: 0, title: 'Manage' },
		{ id: 1, title: 'Company' },
		{ id: 2, title: 'Mold No' },
		{ id: 3, title: 'kg/m' },
		{ id: 4, title: 'Perimeter (mm)' },
		{ id: 6, title: 'Mold Type' },
		{ id: 7, title: 'Tool Cost (USD)' },
		{ id: 8, title: 'Created At' },
	]

	const rows = deferredMolds.map((el: any, key: number) => (
		<tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
			<td className='p-2 flex gap-2'>
				<Link passHref href={`/database/molds/${el.id}`}>
					<Button>Edit</Button>
				</Link>
				<DeleteButton table='molds' data={el} />
			</td>
			<td className='p-2'>{el.companiesId}</td>
			<td className='p-2'>{el.moldNo}</td>
			<td className='p-2'>{+el.kgm}</td>
			<td className='p-2'>{+el.perimeter}</td>
			<td className='p-2'>{el.moldType}</td>
			<td className='p-2'>{el.toolCost}</td>
			<td className='p-2'>{new Date(el.createdAt).toLocaleDateString()}</td>
		</tr>
	))

	return (
		<>
			<Head>
				<title>Erd Metal - Molds</title>
			</Head>
			<main className='container'>
				<InputGroup
					data={{
						table: 'molds',
						inputs: [
							{
								id: 'companiesId',
								label: 'Company',
								autoComplete: true,
								acArray: deferredCompanies,
								required: true,
								options: 'name',
							},
							{
								id: 'moldNo',
								type: 'number',
								label: 'Mold No',
								required: true,
							},
							{ id: 'kgm', label: 'kg/m', required: true },
							{
								id: 'perimeter',
								type: 'number',
								label: 'perimeter',
								required: true,
							},
							{
								id: 'moldType',
								label: 'Mold Type',
								autoComplete: true,
								acArray: [
									{ id: 0, type: 'Solid' },
									{ id: 1, type: 'Hollow' },
								],
								required: true,
								options: 'type',
							},
							{
								id: 'toolCost',
								type: 'number',
								label: 'Tool Cost (USD)',
								required: true,
							},
						],
					}}
				/>
				<Table columns={columns} rows={rows} />
			</main>
		</>
	)
}

export default Molds
