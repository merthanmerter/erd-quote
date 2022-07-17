import EditButton from '@components/buttons/edit'
import InputGroup from '@components/InputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import addLeadingZeros from '@lib/addLeadingZeros'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const ProjectsPage: NextPageWithLayout = () => {
  const { data: products, mutate } = useFetchData('/api/data/many/products')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Product No' },
    { id: 2, title: 'Customer Product No' },
    { id: 3, title: 'Projects' },
    { id: 4, title: 'Created At' },
  ]

  const rows = products?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/products/products/${el.id}`} />
        {/* <DeleteButton mutate={mutate} table="products" data={el} /> */}
      </td>
      <td className="p-2">{'ERD' + addLeadingZeros(el?.id, 5)}</td>
      <td className="p-2">{el?.customerProductId}</td>
      <td className="p-2">{el?.projects?.length}</td>
      <td className="p-2">{new Date(el?.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'products',
          inputs: [{ id: 'customerProductId', label: 'Customer Product Name', required: true }],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default ProjectsPage

ProjectsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Products">{page}</PrimaryLayout>
}
