import PrimaryLayout from '@components/layouts/primary'
import useFetchData from 'hooks/useFetchData'
import Link from 'next/link'
import { NextPageWithLayout } from 'pages/page'

const ManufacturedPartPage: NextPageWithLayout = () => {
  const { data: manufactured } = useFetchData(`/api/data/unique/manufactured`, { findUnique: true })

  return (
    <section>
      <div>
        <p className="">
          <span className="font-bold mr-2">Part Id:</span>
          {manufactured?.id.toUpperCase()}
        </p>
        <p className="">
          <span className="font-bold mr-2">Mold No:</span>
          {manufactured?.moldsId}
        </p>
        <p className="">
          <span className="font-bold mr-2">Length:</span>
          {manufactured?.profileLength}
        </p>
        <p className="">
          <span className="font-bold mr-2">Alloy:</span>
          {manufactured?.alloysId}
        </p>
        <p className="">
          <span className="font-bold mr-2">Surface:</span>
          {manufactured?.surfacesId}
        </p>
        <p className="">
          <span className="font-bold mr-2">Color:</span>
          {manufactured?.colorsId}
        </p>
        <p className="">
          <span className="font-bold mr-2">Drawing:</span>
          <Link href="#">
            <a className="hover:underline">{manufactured?.drawingsId}</a>
          </Link>
        </p>
        <p className="">
          <span className="font-bold mr-2">Created At:</span>
          {new Date(manufactured?.createdAt).toLocaleDateString()}
        </p>
      </div>
    </section>
  )
}

export default ManufacturedPartPage

ManufacturedPartPage.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote - Manufactured Part">{page}</PrimaryLayout>
}
