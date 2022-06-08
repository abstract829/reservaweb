import '../styles/globals.css'
import 'devextreme/dist/css/dx.light.css'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AuthProvider } from '../context/AuthContext'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
