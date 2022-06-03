import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchEliminarEmpresa,
  fetchEliminarUsuarioEmpresa,
  fetchGuardarEmpresa,
  fetchGuardarUsuarioEmpresa,
  fetchListarEmpresas,
  fetchListarUsuariosEmpresa,
  fetchObtenerEmpresaPorId,
  fetchObtenerUsuarioEmpresaPorId,
} from '../services/empresas'

import useAuth from './useAuth'
const key = 'listaEmpresas'
export const useMutateEmpresa = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchGuardarEmpresa, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useQueryEmpresas = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key], fetchListarEmpresas, {
    enabled: isAuthenticated,
  })
}
export const useDeleteEmpresa = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchEliminarEmpresa, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useQueryEmpresaById = ({ id }) => {
  return useQuery([key, id], () => fetchObtenerEmpresaPorId({ id }))
}
const keyUsuarios = 'listaUsuariosEmpresa'
export const useMutateUsuarioEmpresa = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchGuardarUsuarioEmpresa, {
    onSuccess: () => {
      queryClient.invalidateQueries([keyUsuarios])
    },
  })
}
export const useQueryUsuariosEmpresa = ({ empresaId }) => {
  const { isAuthenticated } = useAuth()
  return useQuery(
    [keyUsuarios, Number(empresaId)],
    () => fetchListarUsuariosEmpresa({ empresaId }),
    {
      enabled: isAuthenticated,
    }
  )
}
export const useDeleteUsuarioEmpresa = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchEliminarUsuarioEmpresa, {
    onSuccess: () => {
      queryClient.invalidateQueries([keyUsuarios])
    },
  })
}
export const useQueryUsuarioEmpresaById = ({ id }) => {
  return useQuery([keyUsuarios, id], () =>
    fetchObtenerUsuarioEmpresaPorId({ id })
  )
}
