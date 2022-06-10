import api from '../utils/axios'
export const fetchObtenerCalendario = async ({ Fecha }) => {
  const { data } = await api.post('/api/reserva/calendarioWeb', { Fecha })
  return data
}
export const fetchRealizarReserva = async (req) => {
  console.log('REQUEST', req)
  const { data } = await api.post('/api/reserva/solicitarWeb', req)
  return data
}
