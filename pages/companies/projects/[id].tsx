import Button from '@components/buttons'
import MyCombobox from '@components/combobox'
import PrimaryLayout from '@components/layouts/primary'
import { XIcon } from '@heroicons/react/solid'
import addLeadingZeros from '@lib/addLeadingZeros'
import useFetchData from 'hooks/useFetchData'
import Link from 'next/link'
import { NextPageWithLayout } from 'pages/page'
import { useEffect, useState } from 'react'

const ProjectPage: NextPageWithLayout = () => {
  const { data: project, mutate } = useFetchData(`/api/data/unique/projects`, { findUnique: true })
  const { data: eligibleProducts } = useFetchData(`/api/eligible_products/${project?.companies?.name}`)

  const [products, setProducts] = useState([])

  useEffect(() => {
    if (eligibleProducts && project) {
      return setProducts(
        eligibleProducts.filter(function (objFromA: any) {
          return !project.products.find(function (objFromB: any) {
            return objFromA.id === objFromB.id
          })
        }) // exclude already added products
      )
    }
  }, [eligibleProducts, project])

  const addProduct = async (event: any) => {
    event.preventDefault()

    const input = event?.target?.['product']?.value
    const method = 'PATCH'

    const body = {
      data: {
        project: project.id,
        product: input,
      },
      table: 'projects',
    }

    const res = await fetch(`/api/products`, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status < 300) {
      mutate()
    }
  }

  const deleteProduct = async (event: any, id: string) => {
    const body = {
      data: {
        project: project.id,
        product: id,
      },
      table: 'projects',
    }

    const res = await fetch(`/api/products`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status < 300) {
      mutate()
    }
  }

  return (
    <section>
      <p className="">
        <span className="font-bold mr-2">Project Name:</span>
        {project?.name}
      </p>
      <p className="">
        <span className="font-bold mr-2">Company Name:</span>
        <Link href={`/companies/companies/${project?.companies?.id}`}>
          <a className="link">{project?.companies?.name}</a>
        </Link>
      </p>
      <p className="">
        <span className="font-bold mr-2">Project Description:</span>
        {project?.description}
      </p>
      <p className="">
        <span className="font-bold mr-2">Created At:</span>
        {new Date(project?.createdAt).toLocaleDateString()}
      </p>
      <div className="">
        <div className="mt-6 border-t pt-6">
          <form onSubmit={addProduct} className="flex gap-2 items-center justify-start">
            <MyCombobox
              array={products}
              name={'product'}
              label={'Products'}
              required={true}
              options="customerProductId"
            />
            <Button>Connect to Project</Button>
          </form>
        </div>
        <div className="mt-6 border-t pt-6">
          <div className="font-bold mb-4 w-full">Products</div>
          <div className="flex gap-2 w-full">
            {project?.products?.map((el: any) => (
              <div key={el.id} className="bg-zinc-300 flex gap-2 rounded-l text-sm items-center font-bold">
                <div className="py-2 pl-4 pr-2">{'ERD' + addLeadingZeros(el.id, 5) + ' - ' + el.customerProductId}</div>
                <button className="bg-red-600 p-2 rounded-r" onClick={(event: any) => deleteProduct(event, el.id)}>
                  <XIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectPage

ProjectPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Project">{page}</PrimaryLayout>
}
