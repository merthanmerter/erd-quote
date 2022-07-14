import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const ManufacturedPartsPage: NextPageWithLayout = () => {
  const { data: manufactured, mutate } = useFetchData('/api/data/many/manufactured')
  const { data: molds } = useFetchData('/api/data/many/molds')
  const { data: alloys } = useFetchData('/api/data/many/alloys')
  const { data: surfaces } = useFetchData('/api/data/many/surfaces')
  const { data: colors } = useFetchData('/api/data/many/colors')
  const { data: drawings } = useFetchData('/api/data/many/drawings')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Part Id' },
    { id: 2, title: 'Mold No' },
    { id: 3, title: 'Length' },
    { id: 4, title: 'Alloy' },
    { id: 5, title: 'Surface' },
    { id: 6, title: 'Color' },
    { id: 7, title: 'Drawing' },
    { id: 8, title: 'Created At' },
  ]

  const rows = manufactured?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/parts/manufactured/${el.id}`} />
        <DeleteButton mutate={mutate} table="manufactured" data={el} />
      </td>
      <td className="p-2">{el.id.toUpperCase()}</td>
      <td className="p-2">{el.moldsId}</td>
      <td className="p-2">{el.profileLength}</td>
      <td className="p-2">{el.alloysId}</td>
      <td className="p-2">{el.surfacesId}</td>
      <td className="p-2">{el.colorsId}</td>
      <td className="p-2">{el.drawingsId}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          id: ['moldsId', 'profileLength', 'alloysId', 'surfacesId', 'colorsId', 'drawing'],
          table: 'manufactured',
          inputs: [
            {
              id: 'moldsId',
              label: 'Mold',
              required: true,
              autoComplete: true,
              acArray: molds,
              options: 'moldNo',
              type: 'number',
            },
            {
              id: 'profileLength',
              label: 'Profile Length (mm)',
              required: true,
              type: 'number',
            },
            {
              id: 'alloysId',
              label: 'Alloy',
              required: true,
              autoComplete: true,
              acArray: alloys,
              options: 'alloy',
            },
            {
              id: 'surfacesId',
              label: 'Surface',
              required: true,
              autoComplete: true,
              acArray: surfaces,
              options: 'surface',
            },
            {
              id: 'colorsId',
              label: 'Color',
              required: true,
              autoComplete: true,
              acArray: colors,
              options: 'color',
            },
            {
              id: 'drawingsId',
              label: 'Drawing',
              autoComplete: true,
              acArray: drawings,
              options: 'code',
            },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default ManufacturedPartsPage

ManufacturedPartsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Manufactured Parts">{page}</PrimaryLayout>
}
