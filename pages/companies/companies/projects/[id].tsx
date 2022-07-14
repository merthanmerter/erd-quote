import addLeadingZeros from '@lib/addLeadingZeros'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: any = query.id!

  const projects = await prisma['projects'].findUnique({
    where: { id: id },
    include: {
      companies: true,
      products: {
        include: {
          bom: {
            include: {
              manufactured: {
                include: {
                  molds: true,
                },
              },
              purchased: true,
            },
          },
        },
      },
    },
  })

  return {
    props: {
      projects: JSON.stringify(projects),
    },
  }
}

type Props = {
  projects: any
}

const Company: React.FC<Props> = (props) => {
  const deferredProjects = useDeferredValue(JSON.parse(props.projects))

  console.log(deferredProjects)

  return (
    <>
      <Head>
        <title>Erd Metal - Companies</title>
      </Head>
      <main className="container">
        <p className="">
          <span className="font-bold mr-2">Company Name:</span>
          <Link href={`/companies/companies/${deferredProjects?.companies?.id}`}>
            <a className="link">{deferredProjects?.companies?.name}</a>
          </Link>
        </p>
        <p className="">
          <span className="font-bold mr-2">Project Name:</span>
          {deferredProjects.name}
        </p>
        <p className="">
          <span className="font-bold mr-2">Project Description:</span>
          {deferredProjects.description}
        </p>
        <p className="">
          <span className="font-bold mr-2">Created At:</span>
          {new Date(deferredProjects.createdAt).toLocaleDateString()}
        </p>
        <div className="">
          <div className="mt-6 border-t pt-6">
            <div className="font-bold text-lg mb-4 border-b pb-3 w-fit">
              Products <span className="text-xs bg-gray-300 p-1 rounded">Bill of Materials</span>
            </div>
            {deferredProjects?.products?.map((el: any) => (
              <div key={el.id} className="mb-4">
                <p className="font-bold">{'PRD' + addLeadingZeros(el.id, 5) + ' - ' + el.customerProductId}</p>
                {el.bom.map((el: any, key: number) => (
                  <div className="ml-6 mb-3" key={el.id}>
                    <span>{addLeadingZeros(key + 1, 3)} - </span>
                    <span className="font-bold text-xs bg-gray-300 p-1 rounded">
                      {el.manufacturedId ? 'Manufactured' : 'Purchased'}
                    </span>
                    {' - '}
                    {(el.manufacturedId || el.purchasedId).toUpperCase()}
                    {' - '}
                    <span className="font-bold">{el.quantity}</span>pcs
                    {el.purchasedId ? ' - $' + el?.purchased?.cost * el?.quantity : ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Company
