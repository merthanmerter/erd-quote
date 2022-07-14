import Button from '@components/button'
import MyCombobox from '@components/combobox'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query,
}) => {
	const id: any = query.id!

	const molds = await prisma.molds.findUnique({
		where: { id: id },
		include: {
			whitelist: {
				include: { companies: true },
			},
		},
	})

	const companies = await prisma['companies'].findMany({
		include: { industry: true },
	})

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

const Mold: React.FC<Props> = (props) => {
	const router = useRouter()

	const deferredMolds = useDeferredValue(JSON.parse(props.molds))
	const deferredCompanies = useDeferredValue(JSON.parse(props.companies)) // upsert company to whitelist table

	// whitelist combobox results - current & existing companies excluded
	const whitelist = useDeferredValue(
		deferredCompanies
			.filter(
				(ar: any) =>
					!deferredMolds?.whitelist?.companies.find(
						(rm: any) => rm.name === ar.name
					)
			)
			.filter((el: any) => el.name != deferredMolds?.companiesId)
	)

	const addToWhitelist = async (event: any) => {
		event.preventDefault()

		const input = event?.target?.['whitelist']?.value
		const method = deferredMolds?.whitelist?.id?.length > 0 ? 'PATCH' : 'POST'

		const body = {
			data: {
				moldNo: deferredMolds?.moldNo,
				company: input,
			},
			table: 'whitelist',
		}

		const res = await fetch(`/api/whitelist`, {
			method: method,
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.status < 300) {
			router.replace(router.asPath)
			router.reload()
		}
	}

	const deleteFromWhitelist = async (event: any, id: string) => {
		const body = {
			data: {
				moldNo: deferredMolds?.moldNo,
				company: id,
			},
			table: 'whitelist',
		}

		const res = await fetch(`/api/whitelist`, {
			method: 'DELETE',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.status < 300) {
			router.replace(router.asPath)
			router.reload()
		}
	}

	return (
		<>
			<Head>
				<title>Erd Metal - Molds</title>
			</Head>
			<main className='container'>
				<p className=''>
					<span className='font-bold mr-2'>Mold No:</span>
					{deferredMolds?.moldNo}
				</p>
				<p className=''>
					<span className='font-bold mr-2'>kg/m:</span>
					{deferredMolds?.kgm}
				</p>
				<p className=''>
					<span className='font-bold mr-2'>Perimeter (mm):</span>
					{deferredMolds?.perimeter}
				</p>
				<p className=''>
					<span className='font-bold mr-2'>Company:</span>
					{deferredMolds?.companiesId}
				</p>
				<p className=''>
					<span className='font-bold mr-2'>Mold Type:</span>
					{deferredMolds?.moldType}
				</p>
				<p className=''>
					<span className='font-bold mr-2'>Created At:</span>
					{new Date(deferredMolds?.createdAt).toLocaleDateString()}
				</p>

				<div className='border-t mt-6 pt-6'>
					<form
						onSubmit={addToWhitelist}
						className='flex gap-2 items-center justify-start'>
						<MyCombobox
							array={whitelist}
							name={'whitelist'}
							label={'Company'}
							required={true}
							options='name'
						/>
						<Button>Add to Whitelist</Button>
					</form>
					<div className='mt-6 border-t pt-6 pb-3'>
						<p className='font-bold'>Whitelist:</p>
					</div>
					{deferredMolds?.whitelist?.companies?.map((el: any, key: string) => (
						<div
							key={el.id}
							className='flex gap-2 pb-2 items-center justify-start'>
							<Button
								onClick={(event: any) => deleteFromWhitelist(event, el.id)}>
								Remove
							</Button>
							<p>{el.name}</p>
						</div>
					))}
				</div>
			</main>
		</>
	)
}

export default Mold