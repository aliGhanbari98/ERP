import axios from 'axios'
import { reqWrapper } from './wrapper'

export const worklogsDashboardReq = reqWrapper((params = {}) =>
  axios.get('/worklogs/dashboard', { params }).then((data) => data)
)

export const worklogsReq = reqWrapper((params = {}) =>
  axios.get('/worklogs', { params }).then((data) => data)
)

export const worklogTrafficReq = reqWrapper((params) =>
  axios.get('/worklogs/traffic', { params }).then((data) => data)
)
