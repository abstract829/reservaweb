import { createContext, useEffect, useState } from 'react'
export const ReservaContext = createContext(null)
const INITIAL_STATE = {
  AsistentePrincipal: {},
  Fecha: '',
  Horario: '',
  ComoSeEntero: '',
  RequerimientosEspeciales: '',
  Idioma: 'Español',
  Asistentes: [],
}
export const ReservaProvider = ({ children }) => {
  const [reservaRequest, setReservaRequest] = useState(INITIAL_STATE)

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
  const setDatosAsistentePrincipal = (values) => {
    setReservaRequest((prev) => {
      return {
        ...prev,
        AsistentePrincipal: values,
        ComoSeEntero: values.ComoSeEntero,
        RequerimientosEspeciales: values.RequerimientosEspeciales,
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
  const editAsistente = (asistente) => {
    setReservaRequest((prev) => {
      return {
        ...prev,
        Asistentes: prev.Asistentes.map((a) => {
          if (a.NumeroDocumento === asistente.NumeroDocumento) {
            return asistente
          }
          return a
        }),
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
        editAsistente,
      }}
    >
      {children}
    </ReservaContext.Provider>
  )
}
