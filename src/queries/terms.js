import axios from 'axios'
import { reqWrapper } from './wrapper'

export const getTermsReq = reqWrapper((params) =>
  axios.get('/terms', { ...params }).then((data) => data)
)

export const createTermReq = reqWrapper((body) =>
  axios.post('/terms', { ...body }).then((data) => data)
)

export const getTermsByIdReq = reqWrapper((id) =>
  axios.get(`/terms/${id}`).then((data) => data)
)

export const deleteTermReq = reqWrapper((id) =>
  axios.delete(`/terms/${id}`).then((data) => data)
)

export const updateTermsReq = reqWrapper(({ id, body }) =>
  axios.patch(`/terms/${id}`, { ...body }).then((data) => data)
)
