import axios from 'axios'
import { reqWrapper } from './wrapper'

export const requestsReq = reqWrapper((params = {}) =>
  axios.get('/requests', { params }).then((data) => console.log(data) || data)
)

export const createRequestReq = reqWrapper((body) =>
  axios.post('/requests', { ...body }).then((data) => data)
)

export const requestsDashboardReq = reqWrapper((params = {}) =>
  axios.get('/requests/dashboard', { params }).then((data) => data)
)

export const updateRequestReq = reqWrapper(({ id, body }) =>
  axios.patch(`/requests/${id}/status`, { ...body }).then((data) => data)
)

export const getRequestReq = reqWrapper((id) =>
  axios.get(`/requests/${id}`).then((data) => data)
)

export const deleteRequestReq = reqWrapper((id) =>
  axios.delete(`/requests/${id}`).then((data) => data)
)

export const selectiveUpdateRequestReq = reqWrapper((id) =>
  axios.patch(`/requests/${id}`).then((data) => data)
)
