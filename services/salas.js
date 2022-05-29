import api from '../utils/axios'
export const fetchListarSalas = async () => {
  const { data } = await api.get('/api/sala/listar')
  return data
}
export const fetchListarSalasActivas = async () => {
  const { data } = await api.get('/api/sala/listarActivas')
  return data
}
export const fetchEliminarSala = async ({ SalaId }) => {
  const { data } = await api.post('/api/sala/eliminar', { SalaId })
  return data
}
export const fetchObtenerSalaPorId = async ({ id }) => {
  const { data } = await api.get(`/api/sala/obtener/${id}`)
  return data
}
export const fetchGuardarSala = async ({
  SalaId,
  Nombre,
  DisponibleOnLine,
  Activo,
  MisTemporadas,
  MisFechasBloqueadas,
  DiasBloqueados,
}) => {
  const request = {
    SalaId,
    Nombre,
    DisponibleOnLine,
    Activo,
    MisTemporadas,
    MisFechasBloqueadas,
    DiasBloqueados,
  }
  const { data } = await api.post(`/api/sala/guardar`, request)
  return data
}
