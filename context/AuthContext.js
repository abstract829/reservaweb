import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchAutenticarUsuario, fetchRefreshToken } from '../services/user'
import { getSession, setSession } from '../utils/utils'
export const AuthContext = createContext(null)

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true)
      let token = localStorage.getItem('accessToken')
      if (token) {
        setSession(token)
        const res = await fetchRefreshToken()
        if (res.codigo === 0) {
          setIsAuthenticated(true)
          setUser(res.data)
          setSession(res.data.Token)
        } else {
          router.push('/auth/sign-in')
        }
      } else {
        router.push('/auth/sign-in')
      }
      setIsLoading(false)
    }
    initialize()
  }, [])

  const signIn = async (values) => {
    setIsLoading(true)
    const { email, password } = values
    const res = await fetchAutenticarUsuario({
      Email: email,
      Password: password,
    })
    if (res.codigo === 0) {
      setSession(res.data.Token)
      setIsAuthenticated(true)
      setIsLoading(false)
      setUser(res.data)
      router.push('/dashboard')
    }
    setIsLoading(false)
  }
  const signUp = async () => {
    console.log('sign-up')
  }
  const signOut = async () => {
    setSession(null)
    router.push('/auth/sign-in')
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
