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
