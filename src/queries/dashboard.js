import axios from 'axios'
import { reqWrapper } from './wrapper'

export const progressReq = reqWrapper(() =>
  axios.get('/dashboard/progress').then((data) => data)
)

export const progressCompleteReq = reqWrapper((body) =>
  axios
    .post('/dashboard/progress/complete', {
      ...body,
    })
    .then((data) => data)
)

export const dashboardReq = reqWrapper(() =>
  axios.get('/dashboard').then((data) => data)
)

export const attendeesReq = reqWrapper(() =>
  axios.get('/dashboard/attendees').then((data) => data)
)

export const absencesReq = reqWrapper(() =>
  axios.get('/dashboard/absences').then((data) => data)
)
