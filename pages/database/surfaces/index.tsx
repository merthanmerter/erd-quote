import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const surfaces = await prisma['surfaces'].findMany({
    include: {
      colors: true,
    },
  })

  return {
    props: {
      surfaces: JSON.stringify(surfaces),
    },
  }
}

type Props = {
  surfaces: any
}

const Surfaces: React.FC<Props> = (props) => {
  const deferredSurfaces = useDeferredValue(JSON.parse(props.surfaces))

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Surface' },
    { id: 3, title: 'Description' },
    { id: 4, title: 'Colors' },
    { id: 5, title: 'Created At' },
  ]

  const rows = deferredSurfaces.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <DeleteButton table="surfaces" data={el} />
      </td>
      <td className="p-2">{el.surface}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{el.colors.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <>
      <Head>
        <title>Erd Metal - Surfaces</title>
      </Head>
      <main className="container">
        <InputGroup
          data={{
            table: 'surfaces',
            inputs: [
              { id: 'surface', label: 'Surface', required: true },
              { id: 'description', label: 'Description', required: true },
            ],
          }}
        />
        <Table columns={columns} rows={rows} />
      </main>
    </>
  )
}

export default Surfaces
