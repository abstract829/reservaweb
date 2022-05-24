import { useContext } from 'react'
import { ListadoSalasContext } from '../context/ListadoSalasContext'

const useListadoSalas = () => {
  const context = useContext(ListadoSalasContext)
  return context
}
export default useListadoSalas
