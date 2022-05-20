import { useContext } from 'react'
import { ListadoUsuariosContext } from '../context/ListadoUsuariosContext'

const useListadoUsuarios = () => {
  const context = useContext(ListadoUsuariosContext)
  return context
}
export default useListadoUsuarios
