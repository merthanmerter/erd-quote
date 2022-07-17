import PrimaryLayout from '@components/layouts/primary'
import { useSession } from 'next-auth/react'
import { NextPageWithLayout } from './page'

const Home: NextPageWithLayout = () => {
  const { data: session }: any = useSession()

  return (
    <section>
      <p>
        Welcome <span className="font-bold">{session?.user?.name}</span>. You are{' '}
        <span className="font-bold">{session?.user?.role}</span>.
      </p>
    </section>
  )
}

export default Home

Home.getLayout = (page) => {
  return <PrimaryLayout title="Erd Quote">{page}</PrimaryLayout>
}
