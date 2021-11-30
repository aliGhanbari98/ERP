import axios from 'axios'
import { reqWrapper } from './wrapper'

export const createTeamReq = reqWrapper((body) =>
  axios.post('/teams', { ...body }).then((data) => data)
)

export const teamReq = reqWrapper((id) =>
  axios.get(`/teams/${id}`).then((data) => data)
)

export const deleteTeamReq = reqWrapper((id) =>
  axios.delete(`/teams/${id}`).then((data) => data)
)

export const updateTeamReq = reqWrapper(({ id, body }) =>
  axios.patch(`/teams/${id}`, { ...body }).then((data) => data)
)

export const teamMembersReq = reqWrapper(({ id, params }) =>
  axios.get(`/teams/${id}/members`, { ...params }).then((data) => data)
)
