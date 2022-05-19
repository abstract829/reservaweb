import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchAutenticarUsuario } from '../services/user'
import { setSession } from '../utils/utils'
export const AuthContext = createContext(null)

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState)
  const router = useRouter()
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        if (accessToken) {
          setSession(accessToken)
          // const res = await fetchRefreshUser()
          // const user = res.data
          setState({
            isAuthenticated: true,
            isInitialized: true,
            user: null,
          })
          console.log('refresh token')
        } else {
          console.log('not authenticated')
          setState({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
          })
        }
      } catch (err) {
        console.log('not authenticated')
        setState({
          isAuthenticated: false,
          isInitialized: true,
          user: null,
        })
      }
    }
    initialize()
  }, [])
  const signIn = async (values) => {
    const { email, password } = values
    const res = await fetchAutenticarUsuario({
      Email: email,
      Password: password,
    })
    console.log(res)
    if (res.codigo === 0) {
      setSession(res.data.Token)
      setState({
        isInitialized: false,
        isAuthenticated: true,
        user: { name: res.data.Nombre, email: res.data.Email },
      })
      router.push('/dashboard')
    }
  }
  const signUp = async () => {
    console.log('sign-up')
  }
  const signOut = async () => {
    setSession(null)
    setState({
      isInitialized: false,
      isAuthenticated: false,
      user: null,
    })
    router.push('/auth/sign-in')
  }
  return (
    <AuthContext.Provider value={{ state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
