import Button from '@components/button'
import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
	const companies = await prisma['companies'].findMany({
		include: { industry: true },
	})
	const groups = await prisma['groups'].findMany({})
	const industries = await prisma['industries'].findMany({})

	return {
		props: {
			companies: JSON.stringify(companies),
			industries: JSON.stringify(industries),
			groups: JSON.stringify(groups),
		},
	}
}

type Props = {
	companies: any
	groups: any
	industries: any
}

const Companies: React.FC<Props> = (props) => {
	const deferredCompanies = useDeferredValue(JSON.parse(props.companies))
	const deferredIndustries = useDeferredValue(JSON.parse(props.industries))
	const deferredGroups = useDeferredValue(JSON.parse(props.groups))

	const columns = [
		{ id: 0, title: 'Manage' },
		{ id: 1, title: 'Group Name' },
		{ id: 2, title: 'Company Name' },
		{ id: 3, title: 'Industry' },
		{ id: 4, title: 'Address' },
		{ id: 5, title: 'Created At' },
		// { id: 6, title: 'Company Id' },
	]

	const rows = deferredCompanies.map((el: any, key: number) => (
		<tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
			<td className='p-2 flex gap-2'>
				<Link passHref href={`/companies/companies/${el.id}`}>
					<Button>Edit</Button>
				</Link>
				<DeleteButton table='companies' data={el} />
			</td>
			<td className='p-2'>{el.groupsId || 'None'}</td>
			<td className='p-2'>{el.name}</td>
			<td className='p-2'>{el.industriesId}</td>
			<td className='p-2'>{el.address}</td>
			<td className='p-2'>{new Date(el.createdAt).toLocaleDateString()}</td>
			{/* <td className='p-2'>{el.id.toUpperCase()}</td> */}
		</tr>
	))

	return (
		<>
			<Head>
				<title>Erd Metal - Companies</title>
			</Head>
			<main className='container'>
				<InputGroup
					data={{
						table: 'companies',
						inputs: [
							{
								id: 'groupsId',
								label: 'Group',
								autoComplete: true,
								acArray: deferredGroups,
								options: 'name'
							},
							{ id: 'name', label: 'Company Name', required: true },
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

export default Companies
