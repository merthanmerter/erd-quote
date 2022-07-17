import DeleteButton from '@components/DeleteButton'
import InputGroup from '@components/InputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const SurfacesPage: NextPageWithLayout = () => {
  const { data: surfaces, mutate } = useFetchData('/api/data/many/surfaces')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Surface' },
    { id: 3, title: 'Description' },
    { id: 4, title: 'Colors' },
    { id: 5, title: 'Parts' },
    { id: 6, title: 'Created At' },
  ]

  const rows = surfaces?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <DeleteButton disabled={el.manufactured.length} mutate={mutate} table="surfaces" data={el} />
      </td>
      <td className="p-2">{el.surface}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{el.colors.length}</td>
      <td className="p-2">{el.manufactured.length}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'surfaces',
          inputs: [
            { id: 'surface', label: 'Surface', required: true },
            { id: 'description', label: 'Description', required: true },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default SurfacesPage

SurfacesPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Surfaces">{page}</PrimaryLayout>
}
