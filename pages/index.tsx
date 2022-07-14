import PrimaryLayout from '@components/layouts/primary'
import { NextPageWithLayout } from './page'

const Home: NextPageWithLayout = () => {
  return (
    <section>
      <p>
        Welcome <span className="font-bold">{'auth.userName'}</span>. You are{' '}
        <span className="font-bold">{'auth.userRole'}</span>.
      </p>
    </section>
  )
}

export default Home

Home.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote">{page}</PrimaryLayout>
}
