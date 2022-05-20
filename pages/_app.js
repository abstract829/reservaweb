import '../styles/globals.css'
import 'devextreme/dist/css/dx.light.css'
import { AuthProvider } from '../context/AuthContext'
import { ListadoUsuariosProvider } from '../context/ListadoUsuariosContext'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <AuthProvider>
      <ListadoUsuariosProvider>
        <Component {...pageProps} />
      </ListadoUsuariosProvider>
    </AuthProvider>
  )
}

export default MyApp
