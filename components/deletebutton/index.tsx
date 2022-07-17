import { TrashIcon } from '@heroicons/react/solid'
import React from 'react'

type Props = {
  table: string
  data: any
  mutate: any
  disabled?: boolean
  alsoDelete?: Array<Object>
}

const DeleteButton: React.FC<Props> = ({ data, table, mutate, disabled, alsoDelete }) => {
  const deleteCustomer = async (event: any, id: string) => {
    event.preventDefault()

    const body = {
      data: id,
      table: table,
      alsoDelete: alsoDelete,
    }

    await fetch(`/api/rest`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    mutate()
  }

  return (
    <button disabled={disabled} onClick={(event: any) => deleteCustomer(event, data.id)} className="p-1">
      <TrashIcon className={'h-5 w-5 ' + (disabled ? 'text-zinc-400' : 'text-zinc-600')} />
    </button>
  )
}

export default DeleteButton
