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
  const manufactured = await prisma['manufactured'].findMany({
    orderBy: { createdAt: 'desc' },
  })
  const molds = await prisma['molds'].findMany({})
  const alloys = await prisma['alloys'].findMany({})
  const surfaces = await prisma['surfaces'].findMany({})
  const colors = await prisma['colors'].findMany({})
  const drawings = await prisma['drawings'].findMany({})

  return {
    props: {
      manufactured: JSON.stringify(manufactured),
      molds: JSON.stringify(molds),
      alloys: JSON.stringify(alloys),
      surfaces: JSON.stringify(surfaces),
      colors: JSON.stringify(colors),
      drawings: JSON.stringify(drawings),
    },
  }
}

type Props = {
  manufactured: any
  molds: any
  alloys: any
  surfaces: any
  colors: any
  drawings: any
}

const ManufacturedParts: React.FC<Props> = (props) => {
  const deferredManufactured = useDeferredValue(JSON.parse(props.manufactured))
  const deferredMolds = useDeferredValue(JSON.parse(props.molds))
  const deferredAlloys = useDeferredValue(JSON.parse(props.alloys))
  const deferredSurfaces = useDeferredValue(JSON.parse(props.surfaces))
  const deferredColors = useDeferredValue(JSON.parse(props.colors))
  const deferredDrawings = useDeferredValue(JSON.parse(props.drawings))

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Part Id' },
    { id: 2, title: 'Mold No' },
    { id: 3, title: 'Length' },
    { id: 4, title: 'Alloy' },
    { id: 5, title: 'Surface' },
    { id: 6, title: 'Color' },
    { id: 7, title: 'Drawing' },
    { id: 8, title: 'Created At' },
  ]

  const rows = deferredManufactured.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <Link passHref href={`/parts/manufactured/${el.id}`}>
          <Button>Edit</Button>
        </Link>
        <DeleteButton table="manufactured" data={el} />
      </td>
      <td className="p-2">{el.id.toUpperCase()}</td>
      <td className="p-2">{el.moldsId}</td>
      <td className="p-2">{el.profileLength}</td>
      <td className="p-2">{el.alloysId}</td>
      <td className="p-2">{el.surfacesId}</td>
      <td className="p-2">{el.colorsId}</td>
      <td className="p-2">{el.drawingsId}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <>
      <Head>
        <title>Erd Metal - Manufactured Parts</title>
      </Head>
      <main className="container">
        <InputGroup
          data={{
            id: [
              'moldsId',
              'profileLength',
              'alloysId',
              'surfacesId',
              'colorsId',
              'drawing',
            ],
            table: 'manufactured',
            inputs: [
              {
                id: 'moldsId',
                label: 'Mold',
                required: true,
                autoComplete: true,
                acArray: deferredMolds,
                options: 'moldNo',
                type: 'number',
              },
              {
                id: 'profileLength',
                label: 'Profile Length (mm)',
                required: true,
                type: 'number',
              },
              {
                id: 'alloysId',
                label: 'Alloy',
                required: true,
                autoComplete: true,
                acArray: deferredAlloys,
                options: 'alloy',
              },
              {
                id: 'surfacesId',
                label: 'Surface',
                required: true,
                autoComplete: true,
                acArray: deferredSurfaces,
                options: 'surface',
              },
              {
                id: 'colorsId',
                label: 'Color',
                required: true,
                autoComplete: true,
                acArray: deferredColors,
                options: 'color',
              },
              {
                id: 'drawingsId',
                label: 'Drawing',
                autoComplete: true,
                acArray: deferredDrawings,
                options: 'code',
              },
            ],
          }}
        />
        <Table columns={columns} rows={rows} />
      </main>
    </>
  )
}

export default ManufacturedParts
