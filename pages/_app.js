import '../styles/globals.css'
import 'devextreme/dist/css/dx.light.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../context/AuthContext'
import { ListadoUsuariosProvider } from '../context/ListadoUsuariosContext'
import { ListadoSalasProvider } from '../context/ListadoSalasContext'
import { SelectedsProvider } from '../context/SelectedsContext'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ListadoUsuariosProvider>
          <ListadoSalasProvider>
            <SelectedsProvider>
              <Component {...pageProps} />
            </SelectedsProvider>
          </ListadoSalasProvider>
        </ListadoUsuariosProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
