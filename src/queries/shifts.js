import axios from 'axios'
import { reqWrapper } from './wrapper'

export const createShiftReq = reqWrapper((body) =>
  axios.post('/shifts', { ...body }).then((data) => data)
)

export const shiftReq = reqWrapper((id) =>
  axios.get(`/shifts/${id}`).then((data) => data)
)

export const deleteShiftReq = reqWrapper((id) =>
  axios.delete(`/shifts/${id}`).then((data) => data)
)

export const updateShiftReq = reqWrapper(({ id, body }) =>
  axios.patch(`/shifts/${id}`, { ...body }).then((data) => data)
)

export const shiftUsersReq = reqWrapper(({ id, params }) =>
  axios.get(`/shifts/${id}/users`, { ...params }).then((data) => data)
)
