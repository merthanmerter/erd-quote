import { Combobox } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'
import { useState } from 'react'

export default function MyCombobox(props: any) {
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')

  const filteredArray = (props: any) => {
    if (query === '') {
      return props?.['array']
    } else {
      return props?.['array']?.filter((element: any) => {
        const input = String(element[props?.['options'] || 'name'])
        return input.toLowerCase().includes(query.toLowerCase())
      })
    }
  }

  const handleChange = (event: any) => {
    setSelected(event)
    props.setState ? props.setState(event) : null
  }

  return (
    <Combobox value={selected} onChange={handleChange} nullable={true}>
      <div className="relative">
        {props.label && (
          <label
            htmlFor={props.name}
            className={'uppercase absolute -top-2 left-2 bg-white px-1 text-xs font-bold pointer-events-none'}
          >
            {props.label}
          </label>
        )}
        <Combobox.Input
          id={props.name}
          name={props.name}
          type={props.type || 'text'}
          autoComplete="off"
          className={
            'appearance-none hover:appearance-none w-auto border px-3 py-2 text-sm font-medium rounded leading-5 text-gray-900 focus:ring-0 ' +
            (props.error != true && props.required && props?.error?.includes(props.name) && 'ring-red-500 ring-2') +
            (props.exists && ' ring-red-500 ring-2 ')
          }
          displayValue={(element: any) => element?.[props.options || 'name']}
          onChange={(event) => {
            setQuery(event.target.value)
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        <Combobox.Options className="absolute right-0 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {filteredArray(props)?.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none py-2 text-sm font-bold px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredArray(props)?.map((el: any) => (
              <Combobox.Option
                key={el.id}
                className={({ active }) =>
                  `z-50 text-sm p-2 m-1 rounded-md font-bold z-50 select-none cursor-pointer text-zinc-700 ${
                    active && 'bg-zinc-300'
                  }`
                }
                value={el}
              >
                {el[props.options || 'name']}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
