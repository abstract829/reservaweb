import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchAprobarReserva,
  fetchEditarReserva,
  fetchObtenerCalendario,
  fetchObtenerReservas,
  fetchRealizarReserva,
  fetchRealizarReservaBackOffice,
  fetchRechazarReserva,
} from '../services/reserva'

const key = 'reservas'

export const useQueryCalendario = ({ Fecha }) => {
  return useQuery([key, Fecha], () => fetchObtenerCalendario({ Fecha }))
}
export const useQueryReservas = () => {
  return useQuery([key, 'todas'], fetchObtenerReservas)
}
export const useMutateReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchRealizarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useEditReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchEditarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useCreateReservaBackOffice = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchRealizarReservaBackOffice, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useAprobarReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchAprobarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
export const useRechazarReserva = () => {
  const queryClient = useQueryClient()
  return useMutation(fetchRechazarReserva, {
    onSuccess: () => {
      queryClient.invalidateQueries([key])
    },
  })
}
