import DeleteButton from '@components/DeleteButton'
import InputGroup from '@components/InputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const IndustriesPage: NextPageWithLayout = () => {
  const { data: industries, mutate } = useFetchData('/api/data/many/industries')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Industry Name' },
    { id: 2, title: 'Groups' },
    { id: 3, title: 'Companies' },
    { id: 4, title: 'Created At' },
  ]

  const rows = industries?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <DeleteButton disabled={el.groups.length || el.companies.length} mutate={mutate} table="industries" data={el} />
      </td>
      <td className="p-2">{el.name}</td>
      <td className="p-2">{el.groups.length}</td>
      <td className="p-2">{el.companies.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'industries',
          inputs: [{ id: 'name', label: 'Industry Name', required: true }],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default IndustriesPage

IndustriesPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Industries">{page}</PrimaryLayout>
}
