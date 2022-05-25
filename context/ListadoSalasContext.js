import { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useAuth from '../hooks/useAuth'
import { fetchTodasLasSalas } from '../services/salas'
import { getSession } from '../utils/utils'
export const ListadoSalasContext = createContext(null)
export const ListadoSalasProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const listaSalas = useQuery(['listaSalas'], fetchTodasLasSalas, {
    enabled: isAuthenticated,
  })
  const [listadoSalas, setListadoSalas] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getSession()
    setIsLoading(true)
    if (listaSalas.data) {
      setListadoSalas(listaSalas.data.data)
      setIsLoading(false)
    }
  }, [listaSalas.data])
  return (
    <ListadoSalasContext.Provider
      value={{
        listadoSalas,
        isLoading,
      }}
    >
      {children}
    </ListadoSalasContext.Provider>
  )
}
