import '../styles/globals.css'
import 'devextreme/dist/css/dx.light.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ReservaProvider } from '../context/ReservaContext'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ReservaProvider>
        <Component {...pageProps} />
      </ReservaProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
