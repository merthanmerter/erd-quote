import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const ColorsPage: NextPageWithLayout = () => {
  const { data: colors, mutate } = useFetchData('/api/data/many/colors')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Alloy' },
    { id: 2, title: 'Description' },
    { id: 3, title: 'Surfaces' },
    { id: 4, title: 'Created At' },
  ]

  const rows = colors?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/database/colors/${el.id}`} />
        <DeleteButton mutate={mutate} table="colors" data={el} />
      </td>
      <td className="p-2">{el.color}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{el.surfaces.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'colors',
          inputs: [
            { id: 'color', label: 'Color', required: true },
            { id: 'description', label: 'Description', required: true },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default ColorsPage

ColorsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Colors">{page}</PrimaryLayout>
}
