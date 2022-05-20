import { createContext, useEffect, useState } from 'react'
import { fetchListarUsuarios } from '../services/user'
import { getSession } from '../utils/utils'
export const ListadoUsuariosContext = createContext(null)
export const ListadoUsuariosProvider = ({ children }) => {
  const [listadoUsuarios, setListadoUsuarios] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession()
    const fetchData = async () => {
      setIsLoading(true)
      const res = await fetchListarUsuarios()
      console.log(res)
      if (res.codigo === 0) {
        setListadoUsuarios(
          res.data.map((u) => {
            return {
              id: u.UsuarioId,
              nombre: u.Nombre,
              email: u.Email,
              activo: u.Activo,
            }
          })
        )
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <ListadoUsuariosContext.Provider value={{ listadoUsuarios, isLoading }}>
      {children}
    </ListadoUsuariosContext.Provider>
  )
}
