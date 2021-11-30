import axios from 'axios'
import { reqWrapper } from './wrapper'

export const updateCompanyReq = reqWrapper((body) =>
  axios.patch('/companies', { ...body }).then((data) => data)
)

export const companyTeamsReq = reqWrapper((params) =>
  axios.get('/companies/teams', { ...params }).then((data) => data)
)

export const companyShiftsReq = reqWrapper((params) =>
  axios.get('/companies/shifts', { params }).then((data) => data)
)

export const companyWorkplacesReq = reqWrapper((params) =>
  axios.get('/companies/workplaces', { ...params }).then((data) => data)
)
