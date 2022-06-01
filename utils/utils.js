import api from './axios'

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete api.defaults.headers.common.Authorization
  }
}
export const getSession = () => {
  let token = localStorage.getItem('accessToken')
  if (token) {
    setSession(token)
  } else {
    setSession(null)
  }
}
export const dateParse = (value) => {
  let date = new Date(value)
  let month = date.getMonth() + 1
  let day = date.getDate()
  let year = date.getFullYear()

  return `${day < 10 ? '0' + day : day}/${
    month < 10 ? '0' + month : month
  }/${year}`
}
export function checkRut(rut) {
  // Despejar Puntos
  var valor = rut.replace('.', '')
  var valor = valor.replace('.', '')
  // Despejar Guión
  valor = valor.replace('-', '')

  // Aislar Cuerpo y Dígito Verificador
  var cuerpo = valor.slice(0, -1)
  var dv = valor.slice(-1).toUpperCase()

  // Formatear RUN
  rut = cuerpo + '-' + dv

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if (cuerpo.length < 7) {
    return [false, valor]
  }

  // Calcular Dígito Verificador
  var suma = 0
  var multiplo = 2

  // Para cada dígito del Cuerpo
  for (var i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    var index = multiplo * valor.charAt(cuerpo.length - i)

    // Sumar al Contador General
    suma = suma + index

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo = multiplo + 1
    } else {
      multiplo = 2
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  var dvEsperado = 11 - (suma % 11)

  // Casos Especiales (0 y K)
  dv = dv == 'K' ? 10 : dv
  dv = dv == 0 ? 11 : dv

  // Validar que el Cuerpo coincide con su Dígito Verificador
  if (dvEsperado != dv) {
    return [false, valor]
  }

  // Si todo sale bien, eliminar errores (decretar que es válido)
  return [true, valor]
}
