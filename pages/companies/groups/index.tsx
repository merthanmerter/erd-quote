import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/DeleteButton'
import InputGroup from '@components/InputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const GroupsPage: NextPageWithLayout = () => {
  const { data: groups, mutate } = useFetchData('/api/data/many/groups')
  const { data: industries } = useFetchData('/api/data/many/industries')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Group Name' },
    { id: 2, title: 'Industry' },
    { id: 3, title: 'Address' },
    { id: 4, title: 'Companies' },
    { id: 5, title: 'Created At' },
  ]

  const rows = groups?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/companies/groups/${el.id}`} />
        <DeleteButton disabled={el.companies.length} mutate={mutate} table="groups" data={el} />
      </td>
      <td className="p-2">{el.name}</td>
      <td className="p-2">{el.industriesId}</td>
      <td className="p-2">{el.address}</td>
      <td className="p-2">{el.companies.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'groups',
          inputs: [
            { id: 'name', label: 'Group Name', required: true },
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

export default GroupsPage

GroupsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Groups">{page}</PrimaryLayout>
}
