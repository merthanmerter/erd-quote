import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
	const industries = await prisma['industries'].findMany({
		include: { groups: true, companies: true },
	})

	return {
		props: {
			industries: JSON.stringify(industries),
		},
	}
}

type Props = {
	industries: any
}

const Groups: React.FC<Props> = (props) => {
	const deferredIndustries = useDeferredValue(JSON.parse(props.industries))

	const columns = [
		{ id: 0, title: 'Manage' },
		{ id: 1, title: 'Industry Name' },
		{ id: 2, title: 'Groups' },
		{ id: 3, title: 'Companies' },
		{ id: 4, title: 'Created At' },
	]

	const rows = deferredIndustries.map((el: any, key: number) => (
		<tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
			<td className='p-2 flex gap-2'>
				<DeleteButton table='industries' data={el} />
			</td>
			<td className='p-2'>{el.name}</td>
			<td className='p-2'>{el.groups.length}</td>
			<td className='p-2'>{el.companies.length}</td>
			<td className='p-2'>{new Date(el.createdAt).toLocaleDateString()}</td>
		</tr>
	))

	return (
		<>
			<Head>
				<title>Erd Metal - Industries</title>
			</Head>
			<main className='container'>
				<InputGroup
					data={{
						table: 'industries',
						inputs: [{ id: 'name', label: 'Industry Name', required: true }],
					}}
				/>
				<Table columns={columns} rows={rows} />
			</main>
		</>
	)
}

export default Groups
