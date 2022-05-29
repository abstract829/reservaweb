import api from '../utils/axios'
export const fetchGuardarFeriado = async ({ FeriadoId, Fecha }) => {
  const request = { FeriadoId, Fecha }
  const { data } = await api.post('/api/feriado/guardar', request)
  return data
}
export const fetchObtenerFeriadoPorId = async ({ id }) => {
  const { data } = await api.get(`/api/feriado/obtener/${id}`)
  return data
}
export const fetchEliminarFeriado = async ({ FeriadoId }) => {
  const { data } = await api.post('/api/feriado/eliminar', { FeriadoId })
  return data
}
export const fetchListarFeriados = async () => {
  const { data } = await api.get('/api/feriado/listar')
  return data
}
