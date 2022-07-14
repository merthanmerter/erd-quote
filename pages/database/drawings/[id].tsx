import PrimaryLayout from '@components/layouts/primary'
import Loading from '@components/loading'
import useFetchData from 'hooks/useFetchData'
import { NextPageWithLayout } from 'pages/page'

const DrawingPage: NextPageWithLayout = () => {
  const { data: drawing } = useFetchData(`/api/data/unique/drawings`, { findUnique: true })

  if (!drawing) return <Loading />

  return (
    <section>
      <p className="">
        <span className="font-bold mr-2">Code:</span>
        {drawing?.code}
      </p>
      <p className="">
        <span className="font-bold mr-2">Description:</span>
        {drawing?.description}
      </p>
      <p className="">
        <span className="font-bold mr-2">File Path:</span>
        {drawing?.drawing}
      </p>
      <p className="">
        <span className="font-bold mr-2">Parts:</span>
        {drawing?.manufactured?.length}
      </p>

      <p className="">
        <span className="font-bold mr-2">Created At:</span>
        {new Date(drawing?.createdAt)?.toLocaleDateString()}
      </p>
      <p className="">
        <span className="font-bold mr-2">Created At:</span>
        {new Date(drawing?.createdAt)?.toLocaleDateString()}
      </p>
    </section>
  )
}

export default DrawingPage

DrawingPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Drawing">{page}</PrimaryLayout>
}
