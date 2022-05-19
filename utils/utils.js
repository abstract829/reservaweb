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
  setSession(token)
}
