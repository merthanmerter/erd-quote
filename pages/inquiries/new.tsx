import PrimaryLayout from '@components/layouts/primary'
import fetcher from '@lib/fetcher'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'
import { useState } from 'react'
import useSWR from 'swr'

const NewInquiryPage: NextPageWithLayout = () => {
  const { data: projects } = useFetchData('/api/data/many/projects')
  const [project, setProject] = useState('')

  const { data } = useSWR(project ? `/api/projects/${project}` : null, fetcher)

  return (
    <section>
      <div>Selected Project: {project.toUpperCase()}</div>
      <div className="py-3">
        {projects?.map((project: any, key: number) => (
          <button
            className="text-white font-bold bg-zinc-600 mr-2 p-2 rounded hover:underline"
            key={key}
            onClick={() => setProject(project.id)}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div>
        {data?.products?.map((el: any) => (
          <div key={el.id}>{el.id + ' - ' + el.customerProductId}</div>
        ))}
      </div>
    </section>
  )
}

export default NewInquiryPage

NewInquiryPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - New Inquiry">{page}</PrimaryLayout>
}
