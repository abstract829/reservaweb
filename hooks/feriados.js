import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchEliminarFeriado,
  fetchGuardarFeriado,
  fetchListarFeriados,
} from '../services/feriados'
import useAuth from './useAuth'
const key = 'listaFeriados'
export const useMutateFeriado = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchGuardarFeriado, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useQueryFeriados = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key], fetchListarFeriados, {
    enabled: isAuthenticated,
  })
}
export const useDeleteFeriado = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchEliminarFeriado, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
