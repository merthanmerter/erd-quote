import Button from '@components/button'
import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { NextPageWithLayout } from 'pages/page'
import { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const drawings = await prisma['drawings'].findMany({
    include: { manufactured: true },
  })

  return {
    props: {
      drawings: JSON.stringify(drawings),
    },
  }
}

type Props = {
  drawings: any
  companies: any
}

const Drawings: NextPageWithLayout<Props> = (props) => {
  const deferredDrawings = useDeferredValue(JSON.parse(props.drawings))

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Code' },
    { id: 2, title: 'Description' },
    { id: 3, title: 'File Path' },
    { id: 3, title: 'Parts' },
    { id: 4, title: 'Created At' },
    { id: 5, title: 'Updated At' },
  ]

  const rows = deferredDrawings.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <Link passHref href={`/database/drawings/${el.id}`}>
          <Button>Edit</Button>
        </Link>
        <DeleteButton table="drawings" data={el} />
      </td>
      <td className="p-2">{el.code}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{el.drawing}</td>
      <td className="p-2">{el.manufactured.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
      <td className="p-2">{new Date(el.updatedAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <>
      <Head>
        <title>Erd Metal - Molds</title>
      </Head>
      <main className="container">
        <InputGroup
          data={{
            table: 'drawings',
            inputs: [
              {
                id: 'code',
                label: 'Code',
                required: true,
              },
              {
                id: 'description',
                label: 'Description',
                required: true,
              },
              {
                id: 'drawing',
                label: 'File',
                required: true,
                type: 'file',
              },
            ],
          }}
        />
        <Table columns={columns} rows={rows} />
      </main>
    </>
  )
}

export default Drawings
