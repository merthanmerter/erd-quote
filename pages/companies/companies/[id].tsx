import Button from '@components/button'
import DeleteButton from '@components/deletebutton'
import Table from '@components/table'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { NextPageWithLayout } from 'pages/page'
import { useDeferredValue } from 'react'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: any = query.id!

  const companies = await prisma['companies'].findUnique({
    where: { id: id },
    include: {
      whitelist: {
        include: {
          molds: true,
        },
      },
      molds: true,
      projects: true,
    },
  })
  const molds = await prisma['molds'].findMany({})

  return {
    props: {
      companies: JSON.stringify(companies),
      molds: JSON.stringify(molds),
    },
  }
}

type Props = {
  companies: any
  molds: any
}

const Company: NextPageWithLayout<Props> = (props) => {
  const deferredCompanies = useDeferredValue(JSON.parse(props.companies))

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Project Name' },
    { id: 2, title: 'Project Description' },
    { id: 3, title: 'Created At' },
  ]

  const rows = deferredCompanies?.projects?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <Link passHref href={`/companies/companies/projects/${el.id}`}>
          <Button>Edit</Button>
        </Link>
        <DeleteButton table="companies" data={el} />
      </td>
      <td className="p-2">{el.name}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <>
      <Head>
        <title>Erd Metal - Companies</title>
      </Head>
      <main className="container">
        <p className="">
          <span className="font-bold mr-2">Company Name:</span>
          {deferredCompanies.name}
        </p>
        <p className="">
          <span className="font-bold mr-2">Group Name:</span>
          {deferredCompanies.groupsId || 'deferredCompanies.name'}
        </p>
        <p className="">
          <span className="font-bold mr-2">Industry:</span>
          {deferredCompanies.industriesId}
        </p>
        <p className="">
          <span className="font-bold mr-2">Address:</span>
          {deferredCompanies.address}
        </p>
        <p className="">
          <span className="font-bold mr-2">Created At:</span>
          {new Date(deferredCompanies.createdAt).toLocaleDateString()}
        </p>
        <div className="">
          <div className="mt-10 pt-6 border-t">
            <p className="font-bold">Projects:</p>
            <Table columns={columns} rows={rows} />
          </div>
          <div className="mt-6 border-t pt-6">
            <p className="font-bold pb-2">Molds:</p>
            {deferredCompanies?.molds?.map((el: any) => (
              <Link key={el.id} href={`/database/molds/${el.id}`}>
                <a className="hover:underline py-1 px-2 rounded-md bg-zinc-600 text-white font-bold mr-2">
                  {el.moldNo}
                </a>
              </Link>
            ))}
          </div>
          <div className="mt-6 border-t pt-6">
            <p className="font-bold pb-2">Whitelisted Molds:</p>
            {deferredCompanies?.whitelist?.map((el: any) => (
              <Link key={el.id} href={`/database/molds/${el.molds.id}`}>
                <a className="hover:underline py-1 px-2 rounded-md bg-zinc-600 text-white font-bold mr-2">
                  {el.moldNo}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Company
