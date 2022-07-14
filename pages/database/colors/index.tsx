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
  const colors = await prisma['colors'].findMany({
    include: { surfaces: true },
  })

  return {
    props: {
      colors: JSON.stringify(colors),
    },
  }
}

type Props = {
  colors: any
}

const Colors: React.FC<Props> = (props) => {
  const deferredColors = useDeferredValue(JSON.parse(props.colors))

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Alloy' },
    { id: 2, title: 'Description' },
    { id: 3, title: 'Surfaces' },
    { id: 4, title: 'Created At' },
  ]

  const rows = deferredColors.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <Link passHref href={`/database/colors/${el.id}`}>
          <Button>Edit</Button>
        </Link>
        <DeleteButton table="colors" data={el} />
      </td>
      <td className="p-2">{el.color}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{el.surfaces.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <>
      <Head>
        <title>Erd Metal - Colors</title>
      </Head>
      <main className="container">
        <InputGroup
          data={{
            table: 'colors',
            inputs: [
              { id: 'color', label: 'Color', required: true },
              { id: 'description', label: 'Description', required: true },
            ],
          }}
        />
        <Table columns={columns} rows={rows} />
      </main>
    </>
  )
}

export default Colors
