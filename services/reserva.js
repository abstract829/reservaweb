import api from '../utils/axios'
export const fetchObtenerCalendario = async ({ Fecha }) => {
  const { data } = await api.post('/api/reserva/calendarioWeb', { Fecha })
  return data
}
