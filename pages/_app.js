import '../styles/globals.css'
import 'devextreme/dist/css/dx.light.css'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
