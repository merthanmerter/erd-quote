import Button from '@components/button'
import MyCombobox from '@components/combobox'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
	data: any
}

const InputGroup: React.FC<Props> = ({ data }) => {
	const router = useRouter()
	const [error, setError] = React.useState<[]>([])
	const [exists, setExists] = React.useState<boolean>(false)

	const createCustomer = async (event: any) => {
		event.preventDefault()

		let tempData: any = {}
		let errorData: any = []
		for (let i in data.inputs) {
			const input = event?.target?.[data?.inputs?.[i]?.id]
			if (data?.inputs?.[i]?.required == true && input?.value == 0) {
				errorData.push(input['name'])
			} else {
				tempData[data.inputs[i]?.id] =
					input?.type == 'number' ? +input?.value || null : input?.value || null
			}
		}

		// when custom id required
		let idMerge: any = []
		for (let i in data.id) {
			const input = event?.target?.[data?.inputs?.[i]?.id]
			idMerge.push(input.value.replace(/\s+/g, '-').toLowerCase())
		}
		const id = JSON.stringify(idMerge.join('-')).replace(/["']/g, '')

		const resultData = data.id ? { id: id, ...tempData } : tempData

		if (errorData.length > 0) {
			setError(errorData)
			setExists(false)
		} else {
			const body = {
				data: resultData,
				table: data.table,
			}

			const res = await fetch(`/api/rest`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (res.status < 300) {
				router.replace(router.asPath)
				router.reload()
				setExists(false)
				setError([])
			} else {
				setExists(true)
				setError([])
			}
		}
	}

	return (
		<div className=''>
			<Alert pop={exists} type={'error'}>
				Something went wrong.
			</Alert>
			<form
				className='flex gap-x-2 gap-y-4 items-center flex-wrap'
				onSubmit={createCustomer}>
				{data?.inputs?.map((el: any, key: any) =>
					el.autoComplete ? (
						<MyCombobox
							array={el.acArray}
							error={error}
							key={key}
							name={el.id}
							label={el.label}
							required={el.required}
							options={el.options}
							type={el?.type}
						/>
					) : (
						<Input
							error={error}
							key={key}
							name={el.id}
							label={el.label}
							required={el.required}
							type={el?.type}
						/>
					)
				)}
				<Button>Add</Button>
			</form>
		</div>
	)
}

export default InputGroup

type Alert = {
	children: string
	type: string
	pop: boolean
}

const Alert: React.FC<Alert> = (props: any) => {
	if (props.pop) {
		return (
			<div
				className={
					'w-full mb-6 font-bold p-2 rounded ' +
					(props.type == 'error' && ' text-red-600 bg-red-200 ') +
					(props.type == 'info' && ' text-blue-600 bg-blue-200 ') +
					(props.type == 'warning' && ' text-yellow-600 bg-yellow-200 ') +
					(props.type == 'success' && ' text-green-600 bg-green-200 ')
				}>
				{props.children}
			</div>
		)
	} else {
		return <></>
	}
}

type Input = {
	label?: string
	name: string
	type?: string
	error?: any
	required?: boolean
}
const Input: React.FC<Input> = (props) => {
	const [value, setValue] = React.useState('')

	const handleEdit = (event: any) => {
		setValue(event.target.value)
	}

	return (
		<div className='relative'>
			{props.label && (
				<label
					htmlFor={props.name}
					className={
						'uppercase absolute -top-2 left-2 bg-white px-1 text-xs font-bold pointer-events-none'
					}>
					{props.label}
				</label>
			)}
			<input
				type={props.type || 'text'}
				id={props.name}
				name={props.name}
				value={value}
				onChange={handleEdit}
				autoComplete='off'
				className={
					'w-auto border px-3 py-2 text-sm font-medium rounded leading-5 text-gray-900 focus:ring-0 ' +
					(props.error != true &&
						props.required &&
						props?.error?.includes(props.name) &&
						'ring-red-500 ring-2')
				}
			/>
		</div>
	)
}
