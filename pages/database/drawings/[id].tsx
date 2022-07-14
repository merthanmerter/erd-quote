import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: any = query.id!

  const drawings = await prisma.drawings.findUnique({
    where: { id: id },
    include: {
      manufactured: true,
    },
  })

  return {
    props: {
      drawings: JSON.stringify(drawings),
    },
  }
}

type Props = {
  drawings: any
}

const Drawing: React.FC<Props> = (props) => {
  const deferredDrawings = useDeferredValue(JSON.parse(props.drawings))

  return (
    <>
      <Head>
        <title>Erd Metal - Drawings</title>
      </Head>
      <main className="container">
        <p className="">
          <span className="font-bold mr-2">Code:</span>
          {deferredDrawings.code}
        </p>
        <p className="">
          <span className="font-bold mr-2">Description:</span>
          {deferredDrawings.description}
        </p>
        <p className="">
          <span className="font-bold mr-2">File Path:</span>
          {deferredDrawings.drawing}
        </p>
        <p className="">
          <span className="font-bold mr-2">Parts:</span>
          {deferredDrawings.manufactured.length}
        </p>

        <p className="">
          <span className="font-bold mr-2">Created At:</span>
          {new Date(deferredDrawings.createdAt).toLocaleDateString()}
        </p>
        <p className="">
          <span className="font-bold mr-2">Created At:</span>
          {new Date(deferredDrawings.createdAt).toLocaleDateString()}
        </p>
      </main>
    </>
  )
}

export default Drawing
