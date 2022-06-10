import { useContext } from 'react'
import { ReservaContext } from '../context/ReservaContext'

const useReserva = () => {
  const context = useContext(ReservaContext)
  return context
}
export default useReserva
