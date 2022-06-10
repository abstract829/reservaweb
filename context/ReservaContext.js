import { createContext, useEffect, useState } from 'react'
export const ReservaContext = createContext(null)
const INITIAL_STATE = {
  AsistentePrincipal: {},
  Fecha: '',
  Horario: '',
  Idioma: 'Español',
  Asistentes: [],
}
export const ReservaProvider = ({ children }) => {
  const [reservaRequest, setReservaRequest] = useState(INITIAL_STATE)
  useEffect(() => {
    console.log(reservaRequest)
  }, [reservaRequest])
  const hasAsistentes = () => {
    return reservaRequest.Asistentes.length > 0
  }
  const validLimitAsistentes = () => {
    return reservaRequest.Asistentes.length < 11
  }
  const resetReserva = () => {
    setReservaRequest(INITIAL_STATE)
  }
  const setDatosFecha = ({ Fecha, Horario, Idioma }) => {
    setReservaRequest((prev) => {
      return {
        ...prev,
        Fecha,
        Horario,
        Idioma,
      }
    })
  }
  const setDatosAsistentePrincipal = (asistente) => {
    setReservaRequest((prev) => {
      return {
        ...prev,
        AsistentePrincipal: asistente,
      }
    })
  }
  const setAsistente = (asistente) => {
    setReservaRequest((prev) => {
      return {
        ...prev,
        Asistentes: [...prev.Asistentes, asistente],
      }
    })
  }
  return (
    <ReservaContext.Provider
      value={{
        reservaRequest,
        setDatosFecha,
        setDatosAsistentePrincipal,
        setAsistente,
        resetReserva,
        hasAsistentes,
        validLimitAsistentes,
      }}
    >
      {children}
    </ReservaContext.Provider>
  )
}
