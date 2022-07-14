import PrimaryLayout from '@components/layouts/primary'
import addLeadingZeros from '@lib/addLeadingZeros'
import useFetchData from 'hooks/useFetchData'
import Link from 'next/link'
import { NextPageWithLayout } from 'pages/page'

const ProjectPage: NextPageWithLayout = () => {
  const { data: project } = useFetchData(`/api/data/unique/projects`, { findUnique: true })

  return (
    <section>
      <p className="">
        <span className="font-bold mr-2">Company Name:</span>
        <Link href={`/companies/companies/${project?.companies?.id}`}>
          <a className="link">{project?.companies?.name}</a>
        </Link>
      </p>
      <p className="">
        <span className="font-bold mr-2">Project Name:</span>
        {project?.name}
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
          <div className="font-bold text-lg mb-4 border-b pb-3 w-fit">
            Products <span className="text-xs bg-gray-300 p-1 rounded">Bill of Materials</span>
          </div>
          {project?.products?.map((el: any) => (
            <div key={el.id} className="mb-4">
              <p className="font-bold">{'PRD' + addLeadingZeros(el.id, 5) + ' - ' + el.customerProductId}</p>
              {el.bom.map(
                (el: any, key: number) =>
                  (el.manufacturedId || el.purchasedId) && (
                    <div className="ml-6 mb-3" key={el.id}>
                      <span>{addLeadingZeros(key + 1, 3)} - </span>
                      <span className="font-bold text-xs bg-gray-300 p-1 rounded">
                        {el.manufacturedId ? 'Manufactured' : 'Purchased'}
                      </span>
                      {' - '}
                      {(el.manufacturedId || el.purchasedId)?.toUpperCase()}
                      {' - '}
                      <span className="font-bold">{el.quantity}</span>pcs
                      {el.purchasedId ? ' - $' + el?.purchased?.cost * el?.quantity : ''}
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectPage

ProjectPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Project">{page}</PrimaryLayout>
}
