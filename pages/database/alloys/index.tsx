import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const AlloysPage: NextPageWithLayout = () => {
  const { data: alloys, mutate } = useFetchData('/api/data/many/alloys')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Alloy' },
    { id: 2, title: 'Description' },
    { id: 4, title: 'Created At' },
  ]

  const rows = alloys?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <DeleteButton mutate={mutate} table="alloys" data={el} />
      </td>
      <td className="p-2">{el.alloy}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'alloys',
          inputs: [
            { id: 'alloy', label: 'Alloy', required: true },
            { id: 'description', label: 'Description', required: true },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default AlloysPage

AlloysPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Alloys">{page}</PrimaryLayout>
}
