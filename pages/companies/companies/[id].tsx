import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/DeleteButton'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const CompanyPage: NextPageWithLayout = () => {
  const { data: companies, mutate } = useFetchData(`/api/data/unique/companies`, { findUnique: true })

  const colsProjects = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Project Name' },
    { id: 2, title: 'Project Description' },
    { id: 3, title: 'Products' },
    { id: 4, title: 'Created At' },
  ]

  const rowsProjects = companies?.projects?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/companies/projects/${el.id}`} />
        <DeleteButton mutate={mutate} table="projects" data={el} />
      </td>
      <td className="p-2">{el.name}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{el.products.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  const colsMolds = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Mold No' },
    { id: 2, title: 'kg/m' },
    { id: 3, title: 'Perimeter (mm)' },
    { id: 4, title: 'Mold Type' },
    { id: 5, title: 'Tool Cost' },
    { id: 6, title: 'Created At' },
  ]

  const rowsMolds = companies?.molds.concat(companies?.whitelist)?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/database/molds/${el.id}`} />
      </td>
      <td className="p-2">{el.moldNo || el.molds.moldNo}</td>
      <td className="p-2">{el.kgm || el.molds.kgm}</td>
      <td className="p-2">{el.perimeter || el.molds.perimeter}</td>
      <td className="p-2">{el.moldType || el.molds.moldType}</td>
      <td className="p-2">{el.toolCost || el.molds.toolCost}</td>
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
          <Table columns={colsProjects} rows={rowsProjects} />
        </div>
        <div className="mt-6 border-t pt-6">
          <Table columns={colsMolds} rows={rowsMolds} />
        </div>
      </div>
    </section>
  )
}

export default CompanyPage

CompanyPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Company">{page}</PrimaryLayout>
}
