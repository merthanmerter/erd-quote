import Button from '@components/buttons'
import MyCombobox from '@components/combobox'
import { useState } from 'react'

type Props = {
  data: any
  mutate: any
}

const InputGroup: React.FC<Props> = ({ data, mutate }) => {
  const [error, setError] = useState<[]>([])
  const [exists, setExists] = useState<boolean>(false)

  const createCustomer = async (event: any) => {
    event.preventDefault()

    let tempData: any = {}
    let errorData: any = []
    for (let i in data.inputs) {
      const input = event?.target?.[data?.inputs?.[i]?.id]
      if (data?.inputs?.[i]?.required == true && input?.value == 0) {
        errorData.push(input['name'])
      } else {
        let val
        if (data?.inputs?.[i]?.type === 'decimal') {
          val = (+input?.value).toFixed(2)
        }
        if (data?.inputs?.[i]?.type === 'number') {
          val = +input?.value
        }
        if (!data?.inputs?.[i]?.type || typeof data?.inputs?.[i]?.type === 'undefined') {
          val = String(input?.value)
        }
        tempData[data.inputs[i]?.id] = val
      }
    }

    // when custom id required
    let idMerge: any = []
    for (let i in data.id) {
      const input = event?.target?.[data?.inputs?.[i]?.id]
      idMerge.push(input.value.replace(/\s+/g, '-').toUpperCase())
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
      if (res.status == 409) {
        setExists(true)
        setError([])
      }
      if (res.status < 300) {
        mutate()
        setExists(false)
        setError([])
      }
    }
  }

  return (
    <div className="">
      {exists && (
        <div className="absolute left-0 bottom-0 m-2 p-2 bg-red-500 text-white font-bold rounded animate-bounce">
          Conflict: Already exists.
        </div>
      )}
      <form className="flex gap-x-2 gap-y-4 items-center flex-wrap" onSubmit={createCustomer}>
        {data?.inputs?.map((el: any, key: any) =>
          el.autoComplete ? (
            <MyCombobox
              array={el.acArray}
              setExists={setExists}
              setError={setError}
              setState={el.setState}
              exists={exists}
              error={error}
              key={key}
              name={el.id}
              label={el.label}
              required={el.required}
              options={el.options}
              type={el.type}
            ></MyCombobox>
          ) : (
            <Input
              setExists={setExists}
              setError={setError}
              setState={el.setState}
              exists={exists}
              error={error}
              key={key}
              name={el.id}
              label={el.label}
              required={el.required}
              type={el.type}
            />
          )
        )}
        <Button>Add</Button>
      </form>
    </div>
  )
}

export default InputGroup

function Input(props: any) {
  const [value, setValue] = useState('')

  const handleChange = (event: any) => {
    setValue(event.target.value)
    props.setState ? props.setState(event.target.value) : null
    props.setExists(false)
    props.setError([])
  }

  return (
    <div className="relative">
      {props.label && (
        <label
          htmlFor={props.name}
          className={'uppercase absolute -top-2 left-2 bg-white px-1 text-xs font-bold pointer-events-none'}
        >
          {props.label}
        </label>
      )}
      <input
        id={props.name}
        name={props.name}
        value={value}
        onChange={handleChange}
        type={props.type}
        autoComplete="off"
        className={
          'w-auto border px-3 py-2 text-sm font-medium rounded leading-5 text-gray-900 focus:ring-0 ' +
          (props.error != true && props.required && props?.error?.includes(props.name) && ' ring-red-500 ring-2 ') +
          (props.exists && ' ring-red-500 ring-2 ')
        }
      />
    </div>
  )
}
