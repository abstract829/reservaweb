import api from '../utils/axios'
export const fetchObtenerCalendario = async ({ Fecha }) => {
  const { data } = await api.post('/api/reserva/calendarioWeb', { Fecha })
  return data
}
export const fetchRealizarReserva = async (req) => {
  const { data } = await api.post('/api/reserva/solicitarWeb', req)
  return data
}
export const fetchObtenerReservas = async () => {
  const { data } = await api.get('/api/reserva/listarTodas')
  return data
}
