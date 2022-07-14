import EditButton from '@components/buttons/edit'
import DeleteButton from '@components/deletebutton'
import InputGroup from '@components/inputGroup'
import PrimaryLayout from '@components/layouts/primary'
import Table from '@components/table'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const ProjectsPage: NextPageWithLayout = () => {
  const { data: projects, mutate } = useFetchData('/api/data/many/projects')
  const { data: companies } = useFetchData('/api/data/many/companies')

  const columns = [
    { id: 0, title: 'Manage' },
    { id: 1, title: 'Company Name' },
    { id: 2, title: 'Project Name' },
    { id: 3, title: 'Project Description' },
    { id: 4, title: 'Created At' },
  ]

  const rows = projects?.map((el: any, key: number) => (
    <tr key={el.id} className={key % 2 ? '' : 'bg-gray-100'}>
      <td className="p-2 flex gap-2">
        <EditButton href={`/projects/projects/${el.id}`} />
        <DeleteButton mutate={mutate} table="projects" data={el} />
      </td>
      <td className="p-2">{el.companiesId}</td>
      <td className="p-2">{el.name}</td>
      <td className="p-2">{el.description}</td>
      <td className="p-2">{new Date(el.createdAt).toLocaleDateString()}</td>
    </tr>
  ))

  return (
    <section>
      <InputGroup
        mutate={mutate}
        data={{
          table: 'projects',
          inputs: [
            {
              id: 'companiesId',
              label: 'Company',
              autoComplete: true,
              acArray: companies,
              required: true,
              options: 'name',
            },
            { id: 'name', label: 'Project Name', required: true },
            { id: 'description', label: 'Project Description', required: true },
          ],
        }}
      />
      <Table columns={columns} rows={rows} />
    </section>
  )
}

export default ProjectsPage

ProjectsPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Projects">{page}</PrimaryLayout>
}
