import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchObtenerCalendario } from '../services/reserva'
import useAuth from './useAuth'

const key = 'reservas'

export const useQueryCalendario = ({ Fecha }) => {
  const { isAuthenticated } = useAuth()
  return useQuery([key, Fecha], () => fetchObtenerCalendario({ Fecha }), {
    enabled: isAuthenticated,
  })
}
