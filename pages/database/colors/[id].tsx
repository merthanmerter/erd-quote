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

	const colors = await prisma.colors.findUnique({
		where: { id: id },
		include: {
			surfaces: true,
		},
	})

	const surfaces = await prisma['surfaces'].findMany({})

	return {
		props: {
			colors: JSON.stringify(colors),
			surfaces: JSON.stringify(surfaces),
		},
	}
}

type Props = {
	colors: any
	surfaces: any
}

const Mold: React.FC<Props> = (props) => {
	const router = useRouter()

	const deferredColors = useDeferredValue(JSON.parse(props.colors))
	const deferredSurfaces = useDeferredValue(JSON.parse(props.surfaces)) // upsert company to whitelist table

	// whitelist combobox results - current & existing companies excluded
	const surfaces = useDeferredValue(
		deferredSurfaces.filter(
			(ar: any) =>
				!deferredColors?.surfaces?.find((rm: any) => rm.surface === ar.surface)
		)
	)

	const addSurface = async (event: any) => {
		event.preventDefault()

		const input = event?.target?.['surface']?.value
		const method = 'PATCH'

		const body = {
			data: {
				color: deferredColors.color,
				surface: input,
			},
			table: 'colors',
		}

		const res = await fetch(`/api/colors`, {
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

	const deleteSurface = async (event: any, id: string) => {
		const body = {
			data: {
				color: deferredColors.color,
				surface: id,
			},
			table: 'colors',
		}

		const res = await fetch(`/api/colors`, {
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
					<span className='font-bold mr-2'>Color:</span>
					{deferredColors.color}
				</p>
				<p className=''>
					<span className='font-bold mr-2'>Description:</span>
					{deferredColors.description}
				</p>
				<p className=''>
					<span className='font-bold mr-2'>Created At:</span>
					{new Date(deferredColors.createdAt).toLocaleDateString()}
				</p>

				<div className='border-t mt-6 pt-6'>
					<form
						onSubmit={addSurface}
						className='flex gap-2 items-center justify-start'>
						<MyCombobox
							array={surfaces}
							name={'surface'}
							label={'Surface'}
							required={true}
							options='surface'
						/>
						<Button>Connect to Surface</Button>
					</form>
					<div className='mt-6 border-t pt-6 pb-3'>
						<p className='font-bold'>Surfaces:</p>
					</div>
					{deferredColors?.surfaces?.map((el: any, key: string) => (
						<div
							key={el.id}
							className='flex gap-2 pb-2 items-center justify-start'>
							<Button onClick={(event: any) => deleteSurface(event, el.id)}>
								Remove
							</Button>
							<p>{el.surface}</p>
						</div>
					))}
				</div>
			</main>
		</>
	)
}

export default Mold
