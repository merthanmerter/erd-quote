import Footer from '@components/navigation/footer'
import Header from '@components/navigation/header'
import AuthContext from 'context/auth'
import Head from 'next/head'
import { useContext } from 'react'

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, title }) => {
  const { authenticated } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {authenticated ? (
        <main className="container">{children}</main>
      ) : (
        <main className="container">
          <p>Please log in with an authorized account.</p>
        </main>
      )}
      <Footer />
    </>
  )
}

export default PrimaryLayout
