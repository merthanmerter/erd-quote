import { Combobox } from '@headlessui/react'
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid'
import { useState } from 'react'

export default function MyCombobox(props: any) {
	const [selected, setSelected] = useState('')
	const [query, setQuery] = useState('')

	const filteredArray = (props: any) => {
		if (query === '') {
			return props?.['array']
		} else {
			return props?.['array'].filter((element: any) => {
				const input = element[props?.['options'] || 'name']
				if (props?.['type'] == 'number') {
					return input
				} else {
					return input.toLowerCase().includes(query.toLowerCase())
				}
			})
		}
	}

	const handleChange = (event: any) => {
		if (selected) {
			setQuery('')
			setSelected('')
		} else {
			setSelected(event)
		}
	}

	return (
		<Combobox value={selected} onChange={handleChange} nullable={true}>
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
				<Combobox.Input
					id={props.name}
					name={props.name}
					type={props.type || 'text'}
					autoComplete='off'
					className={
						'appearance-none hover:appearance-none w-auto border px-3 py-2 text-sm font-medium rounded leading-5 text-gray-900 focus:ring-0 ' +
						(props.error != true &&
							props.required &&
							props?.error?.includes(props.name) &&
							'ring-red-500 ring-2')
					}
					displayValue={(element: any) => element?.[props.options || 'name']}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
					{selected ? (
						<XIcon
							className='h-5 w-5 text-gray-400'
							aria-hidden='true'
							onClick={() => {
								setQuery('')
								setSelected('')
							}}
						/>
					) : (
						<SelectorIcon
							className='h-5 w-5 text-gray-400'
							aria-hidden='true'
						/>
					)}
				</Combobox.Button>

				<Combobox.Options className='z-50 appearance-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{filteredArray(props).length === 0 && query !== '' ? (
						<div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
							Nothing found.
						</div>
					) : (
						filteredArray(props).map((el: any) => (
							<Combobox.Option
								key={el.id}
								className={({ active }) =>
									`appearance-none relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? 'bg-zinc-600 text-white' : 'text-gray-900'
									}`
								}
								value={el}>
								{({ selected, active }) => (
									<>
										<span
											className={`block truncate ${
												selected ? 'font-medium' : 'font-normal'
											}`}>
											{el[props.options || 'name']}
										</span>
										{selected ? (
											<span
												className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
													active ? 'text-white' : 'text-zinc-600'
												}`}>
												<CheckIcon className='h-5 w-5' aria-hidden='true' />
											</span>
										) : null}
									</>
								)}
							</Combobox.Option>
						))
					)}
				</Combobox.Options>
			</div>
		</Combobox>
	)
}
