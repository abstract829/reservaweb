import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchGuardarUsuario, fetchListarUsuarios } from '../services/user'
import useAuth from './useAuth'

const key = 'listaUsuarios'

export const useQueryUsers = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key], fetchListarUsuarios, {
    enabled: isAuthenticated,
  })
}
export const useMutateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchGuardarUsuario, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
