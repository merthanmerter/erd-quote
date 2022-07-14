import Footer from '@components/navigation/footer'
import Header from '@components/navigation/header'
import Head from 'next/head'

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, title }) => {
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
}

export default PrimaryLayout
