import '../styles/globals.css'
import 'devextreme/dist/css/dx.light.css'
import { AuthProvider } from '../context/AuthContext'
import { ListadoUsuariosProvider } from '../context/ListadoUsuariosContext'
import { ListadoSalasProvider } from '../context/ListadoSalasContext'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <AuthProvider>
      <ListadoUsuariosProvider>
        <ListadoSalasProvider>
          <Component {...pageProps} />
        </ListadoSalasProvider>
      </ListadoUsuariosProvider>
    </AuthProvider>
  )
}

export default MyApp
