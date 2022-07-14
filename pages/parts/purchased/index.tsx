import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const PurchasedPartsPage: NextPageWithLayout = () => {
  const { data: purchased, mutate } = useFetchData('/api/data/many/purchased')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Code' },
    { id: 2, title: 'Description' },
    { id: 3, title: 'Cost/Unit (USD)' },
    { id: 4, title: 'Unit' },
    { id: 5, title: 'Created At' },
  ]

  const rows = purchased?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <DeleteButton mutate={mutate} table="purchased" data={el} />
      </td>
      <td className="p-2">{el.code}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{+el.cost}</td>
      <td className="p-2">{el.unit}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'purchased',
          inputs: [
            { id: 'code', label: 'Code', required: true },
            { id: 'description', label: 'Description', required: true },
            { id: 'cost', type: 'number', label: 'Cost (USD)' },
            {
              id: 'unit',
              label: 'Unit',
              required: true,
              autoComplete: true,
              acArray: [
                { id: 0, name: 'pcs' },
                { id: 1, name: 'm' },
                { id: 2, name: 'kg' },
              ],
            },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default PurchasedPartsPage

PurchasedPartsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Purchased Parts">{page}</PrimaryLayout>
}
