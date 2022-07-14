import { TrashIcon } from '@heroicons/react/solid'
import React from 'react'

type Props = {
  table: string
  data: any
  mutate: any
}

const DeleteButton: React.FC<Props> = ({ data, table, mutate }) => {
  const deleteCustomer = async (event: any, id: string) => {
    event.preventDefault()

    const body = {
      data: id,
      table: table,
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
    <button onClick={(event: any) => deleteCustomer(event, data.id)} className="p-1">
      <TrashIcon className="h-5 w-5 text-zinc-600" />
    </button>
  )
}

export default DeleteButton
