import '../styles/globals.css'
import 'devextreme/dist/css/dx.light.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../context/AuthContext'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
