import axios from 'axios'
import { reqWrapper } from './wrapper'

export const createWorkplaceReq = reqWrapper((body) =>
  axios.post('/workplaces', { ...body }).then((data) => data)
)

export const getWorkplaceReq = reqWrapper((id) =>
  axios.get(`/workplaces/${id}`).then((data) => data)
)

export const deleteWorkplaceReq = reqWrapper((id) =>
  axios.delete(`/workplaces/${id}`).then((data) => data)
)

export const updateWorkplaceReq = reqWrapper(({ id, body }) =>
  axios.patch(`/workplaces/${id}`, { ...body }).then((data) => data)
)

export const getWorkplaceEmployeesReq = reqWrapper(({ id, params }) =>
  axios.get(`/workplaces/${id}/users`, { ...params }).then((data) => data)
)
