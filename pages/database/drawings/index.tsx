import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/DeleteButton'
import InputGroup from '@components/InputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const DrawingsPage: NextPageWithLayout = () => {
  const { data: drawings, mutate } = useFetchData('/api/data/many/drawings')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Code' },
    { id: 2, title: 'Description' },
    { id: 3, title: 'File Path' },
    { id: 4, title: 'Parts' },
    { id: 5, title: 'Created At' },
    { id: 6, title: 'Updated At' },
  ]

  const rows = drawings?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/database/drawings/${el.id}`} />
        <DeleteButton disabled={el.manufactured.length} mutate={mutate} table="drawings" data={el} />
      </td>
      <td className="p-2">{el.code}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{el.drawing}</td>
      <td className="p-2">{el.manufactured.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
      <td className="p-2">{new Date(el.updatedAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'drawings',
          inputs: [
            {
              id: 'code',
              label: 'Code',
              required: true,
            },
            {
              id: 'description',
              label: 'Description',
              required: true,
            },
            {
              id: 'drawing',
              label: 'File',
              required: true,
              type: 'file',
            },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default DrawingsPage

DrawingsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Drawings">{page}</PrimaryLayout>
}
