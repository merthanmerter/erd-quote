import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: any = query.id!

  const manufactured = await prisma.manufactured.findUnique({
    where: { id: id },
    include: {
      molds: true,
      alloys: true,
      surfaces: true,
      colors: true,
      drawings: true,
    },
  })

  return {
    props: {
      manufactured: JSON.stringify(manufactured),
    },
  }
}

type Props = {
  manufactured: any
}

const Manufactured: React.FC<Props> = (props) => {
  const deferredManufactured = useDeferredValue(JSON.parse(props.manufactured))

  return (
    <>
      <Head>
        <title>Erd Metal - Manufactured Part</title>
      </Head>
      <main className="container">
        <div>
          <p className="">
            <span className="font-bold mr-2">Part Id:</span>
            {deferredManufactured.id.toUpperCase()}
          </p>
          <p className="">
            <span className="font-bold mr-2">Mold No:</span>
            {deferredManufactured.moldsId}
          </p>
          <p className="">
            <span className="font-bold mr-2">Length:</span>
            {deferredManufactured.profileLength}
          </p>
          <p className="">
            <span className="font-bold mr-2">Alloy:</span>
            {deferredManufactured.alloysId}
          </p>
          <p className="">
            <span className="font-bold mr-2">Surface:</span>
            {deferredManufactured.surfacesId}
          </p>
          <p className="">
            <span className="font-bold mr-2">Color:</span>
            {deferredManufactured.colorsId}
          </p>
          <p className="">
            <span className="font-bold mr-2">Drawing:</span>
            <Link href="#">
              <a className="hover:underline">
                {deferredManufactured.drawingsId}
              </a>
            </Link>
          </p>
          <p className="">
            <span className="font-bold mr-2">Created At:</span>
            {new Date(deferredManufactured.createdAt).toLocaleDateString()}
          </p>
        </div>
      </main>
    </>
  )
}

export default Manufactured
