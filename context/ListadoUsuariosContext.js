import { createContext, useEffect, useState } from 'react'
import {
  fetchListarPerfiles,
  fetchListarPerfilesActivos,
  fetchListarUsuarios,
} from '../services/user'
import { getSession } from '../utils/utils'
export const ListadoUsuariosContext = createContext(null)
export const ListadoUsuariosProvider = ({ children }) => {
  const [listadoUsuarios, setListadoUsuarios] = useState(null)
  const [listadoPerfiles, setListadoPerfiles] = useState(null)
  const [listadoPerfilesActivos, setListadoPerfilesActivos] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession()
    const fetchData = async () => {
      setIsLoading(true)
      let res = await fetchListarUsuarios()
      if (res.codigo === 0) {
        setListadoUsuarios(res.data)
      }
      res = await fetchListarPerfiles()
      if (res.codigo === 0) {
        setListadoPerfiles(res.data)
      }
      res = await fetchListarPerfilesActivos()
      if (res.codigo === 0) {
        setListadoPerfilesActivos(res.data)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <ListadoUsuariosContext.Provider
      value={{
        listadoUsuarios,
        listadoPerfiles,
        listadoPerfilesActivos,
        isLoading,
      }}
    >
      {children}
    </ListadoUsuariosContext.Provider>
  )
}
