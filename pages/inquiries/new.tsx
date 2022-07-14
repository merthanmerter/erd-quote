import fetcher from '@lib/fetcher'
import { prisma } from '@prisma/lib/prisma'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from 'pages/page'
import { useDeferredValue, useState } from 'react'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async () =>
  //
  {
    const projects = await prisma['projects'].findMany({})

    return {
      props: {
        projects: JSON.stringify(projects),
      },
    }
  }
type Props = {
  projects: any
}

const NewInquiry: NextPageWithLayout<Props> = (props) => {
  const deferredProjects = useDeferredValue(JSON.parse(props.projects))

  const [project, setProject] = useState('')

  const {
    data,
    // isValidating,
    // error
  } = useSWR(project ? `/api/projects/${project}` : null, fetcher)

  return (
    <main className="container">
      <div>Selected Project: {project.toUpperCase()}</div>
      {deferredProjects.map((project: any, key: number) => (
        <button className="hover:underline" key={key} onClick={() => setProject(project.id)}>
          {project.name}
        </button>
      ))}

      <div>
        {data?.products?.map((el: any) => (
          <div key={el.id}>{el.id + ' - ' + el.customerProductId}</div>
        ))}
      </div>
    </main>
  )
}

export default NewInquiry
