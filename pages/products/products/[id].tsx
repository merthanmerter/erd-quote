import EditButton from '@components/buttons/edit'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import addLeadingZeros from '@lib/addLeadingZeros'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const ProductPage: NextPageWithLayout = () => {
  const { data: product } = useFetchData(`/api/data/unique/products`, { findUnique: true })
  // const { data: manufactured } = useFetchData(`/api/data/many/manufactured`)
  // const { data: purchased } = useFetchData(`/api/data/many/purchased`)

  // const addProject = async (event: any) => {
  //   event.preventDefault()

  //   const input = event?.target?.['surface']?.value
  //   const method = 'PATCH'

  //   const body = {
  //     data: {
  //       id: product?.id,
  //       project: input,
  //     },
  //     table: 'products',
  //   }

  //   const res = await fetch(`/api/addproject`, {
  //     method: method,
  //     body: JSON.stringify(body),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })

  //   if (res.status < 300) {
  //     mutate()
  //   }
  // }

  // const deleteProject = async (event: any, id: string) => {
  //   const body = {
  //     data: {
  //       id: product?.id,
  //       project: id,
  //     },
  //     table: 'products',
  //   }

  //   const res = await fetch(`/api/addproject`, {
  //     method: 'DELETE',
  //     body: JSON.stringify(body),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })

  //   if (res.status < 300) {
  //     mutate()
  //   }
  // }

  const partsColumns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Type' },
    { id: 2, title: 'Part No' },
    { id: 3, title: 'Quantity' },
    { id: 4, title: 'Created At' },
  ]

  const partsRows = product?.bom?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/projects/projects/${el.id}`} />
      </td>
      <td className="p-2">{el?.manufacturedId ? 'Manufactured' : 'Purchased'}</td>
      <td className="p-2">{el?.manufacturedId || el?.purchasedId}</td>
      <td className="p-2">{el.quantity}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <p className="">
        <span className="font-bold mr-2">Product Id:</span>
        {'ERD' + addLeadingZeros(product?.id, 5)}
      </p>
      <p className="">
        <span className="font-bold mr-2">Customer Product Id:</span>
        {product?.customerProductId}
      </p>
      <p className="">
        <span className="font-bold mr-2">Created At:</span>
        {new Date(product?.createdAt).toLocaleDateString()}
      </p>
      <div className="">
        <Table columns={partsColumns} rows={partsRows} />
      </div>
    </section>
  )
}

export default ProductPage

ProductPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Product">{page}</PrimaryLayout>
}
