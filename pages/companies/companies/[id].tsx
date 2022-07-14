import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/deletebutton'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import Link from 'next/link'
import { NextPageWithLayout } from 'pages/page'

const CompanyPage: NextPageWithLayout = () => {
  const { data: companies, mutate } = useFetchData(`/api/data/unique/companies`, { findUnique: true })

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Project Name' },
    { id: 2, title: 'Project Description' },
    { id: 3, title: 'Created At' },
  ]

  const rows = companies?.projects?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/projects/projects/${el.id}`} />
        <DeleteButton mutate={mutate} table="companies" data={el} />
      </td>
      <td className="p-2">{el.name}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <p className="">
        <span className="font-bold mr-2">Company Name:</span>
        {companies?.name}
      </p>
      <p className="">
        <span className="font-bold mr-2">Group Name:</span>
        {companies?.groupsId || 'None'}
      </p>
      <p className="">
        <span className="font-bold mr-2">Industry:</span>
        {companies?.industriesId}
      </p>
      <p className="">
        <span className="font-bold mr-2">Address:</span>
        {companies?.address}
      </p>
      <p className="">
        <span className="font-bold mr-2">Created At:</span>
        {new Date(companies?.createdAt).toLocaleDateString()}
      </p>
      <div className="">
        <div className="mt-10 border-t">
          <Table columns={columns} rows={rows} />
        </div>
        <div className="mt-6 border-t pt-6">
          <p className="font-bold pb-2">Molds:</p>
          {companies?.molds?.map((el: any) => (
            <Link key={el.id} href={`/database/molds/${el.id}`}>
              <a className="hover:underline py-1 px-2 rounded-md bg-zinc-600 text-white font-bold mr-2">{el.moldNo}</a>
            </Link>
          ))}
        </div>
        <div className="mt-6 border-t pt-6">
          <p className="font-bold pb-2">Whitelisted Molds:</p>
          {companies?.whitelist?.map((el: any) => (
            <Link key={el.id} href={`/database/molds/${el.molds.id}`}>
              <a className="hover:underline py-1 px-2 rounded-md bg-zinc-600 text-white font-bold mr-2">{el.moldNo}</a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyPage

CompanyPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Company">{page}</PrimaryLayout>
}
