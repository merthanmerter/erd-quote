import PrimaryLayout from '@components/layouts/primary'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const GroupPage: NextPageWithLayout = () => {
  const { data: group } = useFetchData(`/api/data/unique/groups`, { findUnique: true })

  return (
    <section>
      <h1 className="uppercase">{group?.id}</h1>
    </section>
  )
}

export default GroupPage

GroupPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Group">{page}</PrimaryLayout>
}
