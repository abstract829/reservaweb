import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchGuardarPerfil,
  fetchListarModulos,
  fetchListarPerfiles,
  fetchListarPerfilesActivos,
  fetchObtenerPerfilPorId,
} from '../services/user'
import useAuth from './useAuth'

const key = 'listaPerfiles'

export const useQueryPerfiles = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key], fetchListarPerfiles, {
    enabled: isAuthenticated,
  })
}

export const useQueryPerfilesActivos = () => {
  const { isAuthenticated } = useAuth()
  return useQuery([key, +'Activos'], fetchListarPerfilesActivos, {
    enabled: isAuthenticated,
  })
}

export const useMutatePerfil = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchGuardarPerfil, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}

export const useQueryPerfilById = ({ id }) => {
  return useQuery([key, id], () => fetchObtenerPerfilPorId({ id }))
}

const funcionesKey = 'funciones'
export const useQueryFunciones = () => {
  return useQuery([funcionesKey], fetchListarModulos)
}
