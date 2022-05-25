import { createContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useAuth from '../hooks/useAuth'
import {
  fetchListarPerfiles,
  fetchListarPerfilesActivos,
  fetchListarUsuarios,
} from '../services/user'
import { getSession } from '../utils/utils'
export const ListadoUsuariosContext = createContext(null)
export const ListadoUsuariosProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const listaUsuarios = useQuery(['listaUsuarios'], fetchListarUsuarios, {
    enabled: isAuthenticated,
  })
  const listaPerfiles = useQuery(['listaPerfiles'], fetchListarPerfiles, {
    enabled: isAuthenticated,
  })
  const listaPerfilesActivos = useQuery(
    ['listaPerfilesActivos'],
    fetchListarPerfilesActivos,
    { enabled: isAuthenticated }
  )
  const [listadoUsuarios, setListadoUsuarios] = useState(null)
  const [listadoPerfiles, setListadoPerfiles] = useState(null)
  const [listadoPerfilesActivos, setListadoPerfilesActivos] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession()
    setIsLoading(true)
    if (listaUsuarios.data && listaPerfiles.data && listaPerfilesActivos.data) {
      setListadoUsuarios(listaUsuarios.data.data)
      setListadoPerfiles(listaPerfiles.data.data)
      setListadoPerfilesActivos(listaPerfilesActivos.data.data)
      setIsLoading(false)
    }
  }, [listaUsuarios.data, listaPerfiles.data, listaPerfilesActivos.data])
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
