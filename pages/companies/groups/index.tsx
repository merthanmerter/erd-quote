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
	const groups = await prisma['groups'].findMany({
		include: { industry: true, companies: true },
	})
	const industries = await prisma['industries'].findMany({})

	return {
		props: {
			groups: JSON.stringify(groups),
			industries: JSON.stringify(industries),
		},
	}
}

type Props = {
	groups: any
	industries: any
}

const Groups: React.FC<Props> = (props) => {
	const deferredGroups = useDeferredValue(JSON.parse(props.groups))
	const deferredIndustries = useDeferredValue(JSON.parse(props.industries))

	const columns = [
		{ id: 0, title: 'Manage' },
		{ id: 1, title: 'Group Name' },
		{ id: 2, title: 'Industry' },
		{ id: 3, title: 'Address' },
		{ id: 4, title: 'Companies' },
		{ id: 5, title: 'Created At' },
		// { id: 6, title: 'Group Id' },
	]

	const rows = deferredGroups.map((el: any, key: number) => (
		<tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
			<td className='p-2 flex gap-2'>
				<Link passHref href={`/companies/groups/${el.id}`}>
					<Button>Edit</Button>
				</Link>
				<DeleteButton table='groups' data={el} />
			</td>
			<td className='p-2'>{el.name}</td>
			<td className='p-2'>{el.industriesId}</td>
			<td className='p-2'>{el.address}</td>
			<td className='p-2'>{el.companies.length}</td>
			<td className='p-2'>{new Date(el.createdAt).toLocaleDateString()}</td>
			{/* <td className='p-2'>{el.id.toUpperCase()}</td> */}
		</tr>
	))

	return (
		<>
			<Head>
				<title>Erd Metal - Groups</title>
			</Head>
			<main className='container'>
				<InputGroup
					data={{
						table: 'groups',
						inputs: [
							{ id: 'name', label: 'Group Name', required: true },
							{
								id: 'industriesId',
								label: 'Industry',
								required: true,
								autoComplete: true,
								acArray: deferredIndustries,
								options: 'name'
							},
							{ id: 'address', label: 'Address', required: true },
						],
					}}
				/>
				<Table columns={columns} rows={rows} />
			</main>
		</>
	)
}

export default Groups
