import axios from 'axios'

const apiURL = 'https://edm.desintegra.com/v1'

const api = axios.create({
  baseURL: apiURL,
})

export default api
