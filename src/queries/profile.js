import axios from 'axios'
import { reqWrapper } from './wrapper'

export const profileReq = reqWrapper(() =>
  axios.get('/me').then((data) => data)
)

export const updateProfileReq = reqWrapper((body) =>
  axios.patch('/me', { ...body }).then((data) => data)
)

export const profileTeamsReq = reqWrapper((params) =>
  axios.get('/me/teams', { params }).then((data) => data)
)

export const uploadAvatarReq = reqWrapper((body) =>
  axios.post('/me/avatar', body).then((data) => data)
)

export const deleteAvatarReq = reqWrapper(() =>
  axios.delete('/me/avatar/delete').then((data) => data)
)

export const myWorklogsReq = reqWrapper((params) =>
  axios.get('/me/worklogs', { params }).then((data) => data)
)

export const myWorklogsDetailsReq = reqWrapper((params) =>
  axios.get('/me/worklogs/details', { params }).then((data) => data)
)

export const myWorklogsDashboardReq = reqWrapper(() =>
  axios.get('/me/worklogs/dashboard').then((data) => data)
)

export const myWorklogStatsReq = reqWrapper(() =>
  axios.get('/me/worklogs/statistics').then((data) => data)
)

export const myRequestsDashboardReq = reqWrapper(() =>
  axios.get('/me/requests/dashboard').then((data) => data)
)

export const myRequestsReq = reqWrapper((params) =>
  axios.get('/me/requests', { params }).then((data) => data)
)

export const myAccountingReq = reqWrapper((params) =>
  axios.get('/me/accounting/total', { params }).then((data) => data)
)

export const mySalaryDetailsReq = reqWrapper((params) =>
  axios.get('/me/accounting/charts/donut', { params }).then((data) => data)
)
export const mySalaryPerMonthReq = reqWrapper(() =>
  axios.get('/me/accounting/charts/salaryPerMonth').then((data) => data)
)
