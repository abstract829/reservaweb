import { createContext, useEffect, useState } from 'react'
import { fetchTodasLasSalas } from '../services/salas'
import { getSession } from '../utils/utils'
export const ListadoSalasContext = createContext(null)
export const ListadoSalasProvider = ({ children }) => {
  const [listadoSalas, setListadoSalas] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession()
    const fetchData = async () => {
      setIsLoading(true)
      let res = await fetchTodasLasSalas()
      if (res.codigo === 0) {
        setListadoSalas(res.data)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])
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
