import Button from '@components/button'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  table: string
  data: any
}

const DeleteButton: React.FC<Props> = ({ data, table }) => {
  const router = useRouter()

  const deleteCustomer = async (event: any, id: string) => {
    event.preventDefault()

    const body = {
      data: id,
      table: table,
    }

    const respone = await fetch(`/api/rest`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (respone.status < 300) {
      router.replace(router.asPath)
      router.reload()
    }
  }

  return (
    <Button onClick={(event: any) => deleteCustomer(event, data.id)}>
      Delete
    </Button>
  )
}

export default DeleteButton
