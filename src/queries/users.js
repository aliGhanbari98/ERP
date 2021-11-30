import axios from 'axios'
import { reqWrapper } from './wrapper'

export const usersReq = reqWrapper((params) =>
  axios.get('/users', { params }).then((data) => data)
)

export const createUserReq = reqWrapper((body) =>
  axios.post('/users', { ...body }).then((data) => data)
)

export const getUserReq = reqWrapper((id) =>
  axios.get(`/users/${id}`).then((data) => data)
)

export const deleteUserReq = reqWrapper((id) =>
  axios.delete(`/users/${id}`).then((data) => data)
)

export const updateUserReq = reqWrapper(({ id, body }) =>
  axios.patch(`/users/${id}`, { ...body }).then((data) => data)
)

export const userWorklogDetailReq = reqWrapper(({ id, params }) => {
  return axios.get(`/users/${id}/worklogs`, { params }).then((data) => data)
})

export const updateUserWorklogReq = reqWrapper(({ id, body }) =>
  axios.patch(`/users/${id}/requests/status`, { ...body }).then((data) => data)
)

export const resetPasswordReq = reqWrapper(({ id, body }) =>
  axios.post(`/users/${id}/password/reset`, { ...body }).then((data) => data)
)

export const accountingByUserIdReq = reqWrapper((params) =>
  axios
    .get(`users/${params.user_id}/accounting/total`, { params })
    .then((data) => data)
)
