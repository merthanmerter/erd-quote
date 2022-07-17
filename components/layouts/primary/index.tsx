import Footer from '@components/navigation/footer'
import Header from '@components/navigation/header'
import SignIn from '@components/signin'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, title }) => {
  const { data: session }: any = useSession()

  if (session === null)
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Header />
        <main className="container">
          <SignIn />
        </main>
        <Footer />
      </>
    )

  if (session != null)
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </>
    )

  return <></>
}

export default PrimaryLayout
