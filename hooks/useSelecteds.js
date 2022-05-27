import { useContext } from 'react'
import { SelectedsContext } from '../context/SelectedsContext'

const useSelecteds = () => {
  const context = useContext(SelectedsContext)
  return context
}
export default useSelecteds
