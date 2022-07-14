import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const CompaniesPage: NextPageWithLayout = () => {
  const { data: companies, mutate } = useFetchData('/api/data/many/companies')
  const { data: groups } = useFetchData('/api/data/many/groups')
  const { data: industries } = useFetchData('/api/data/many/industries')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Group Name' },
    { id: 2, title: 'Company Name' },
    { id: 3, title: 'Industry' },
    { id: 4, title: 'Address' },
    { id: 5, title: 'Created At' },
  ]

  const rows = companies?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/companies/companies/${el.id}`} />
        <DeleteButton mutate={mutate} table="companies" data={el} />
      </td>
      <td className="p-2">{el.groupsId || 'None'}</td>
      <td className="p-2">{el.name}</td>
      <td className="p-2">{el.industriesId}</td>
      <td className="p-2">{el.address}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'companies',
          inputs: [
            {
              id: 'groupsId',
              label: 'Group',
              autoComplete: true,
              acArray: groups,
              options: 'name',
            },
            { id: 'name', label: 'Company Name', required: true },
            {
              id: 'industriesId',
              label: 'Industry',
              required: true,
              autoComplete: true,
              acArray: industries,
              options: 'name',
            },
            { id: 'address', label: 'Address', required: true },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default CompaniesPage

CompaniesPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Companies">{page}</PrimaryLayout>
}
