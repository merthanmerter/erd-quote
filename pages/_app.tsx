import '@styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from './page'

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
}

export default MyApp
