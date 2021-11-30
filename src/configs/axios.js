import axios from 'axios'
import { API_HOST } from './index'

axios.defaults.baseURL = API_HOST

axios.interceptors.request.use((config) => {
  const conf = config
  conf.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

  return conf
})
