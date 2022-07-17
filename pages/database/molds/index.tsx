import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/DeleteButton'
import InputGroup from '@components/InputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const MoldsPage: NextPageWithLayout = () => {
  const { data: molds, mutate } = useFetchData('/api/data/many/molds')
  const { data: companies } = useFetchData('/api/data/many/companies')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Company' },
    { id: 2, title: 'Mold No' },
    { id: 3, title: 'kg/m' },
    { id: 4, title: 'Perimeter (mm)' },
    { id: 6, title: 'Mold Type' },
    { id: 7, title: 'Tool Cost (USD)' },
    { id: 8, title: 'Parts' },
    { id: 9, title: 'Whitelisted' },
    { id: 10, title: 'Created At' },
  ]

  const rows = molds?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/database/molds/${el.id}`} />
        <DeleteButton
          disabled={el.manufactured.length}
          mutate={mutate}
          table="molds"
          data={el}
          alsoDelete={[
            {
              table: 'whitelist',
              id: el?.whitelist?.id,
            },
          ]}
        />
      </td>
      <td className="p-2">{el.companiesId}</td>
      <td className="p-2">{el.moldNo}</td>
      <td className="p-2">{el.kgm}</td>
      <td className="p-2">{+el.perimeter}</td>
      <td className="p-2">{el.moldType}</td>
      <td className="p-2">{el.toolCost}</td>
      <td className="p-2">{el.manufactured.length}</td>
      <td className="p-2">{el?.whitelist?.companies?.length || 0}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'molds',
          inputs: [
            {
              id: 'companiesId',
              label: 'Company',
              autoComplete: true,
              acArray: companies,
              required: true,
              options: 'name',
            },
            {
              id: 'moldNo',
              type: 'number',
              label: 'Mold No',
              required: true,
            },
            { id: 'kgm', label: 'kg/m', required: true, type: 'decimal' },
            {
              id: 'perimeter',
              type: 'number',
              label: 'perimeter',
              required: true,
            },
            {
              id: 'moldType',
              label: 'Mold Type',
              autoComplete: true,
              acArray: [
                { id: 0, type: 'Solid' },
                { id: 1, type: 'Hollow' },
              ],
              required: true,
              options: 'type',
            },
            {
              id: 'toolCost',
              type: 'number',
              label: 'Tool Cost (USD)',
              required: true,
            },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default MoldsPage

MoldsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Mold">{page}</PrimaryLayout>
}
