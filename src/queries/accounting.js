import axios from 'axios'
import { reqWrapper } from './wrapper'

// eslint-disable-next-line import/prefer-default-export
export const getUsersAccountingReq = reqWrapper((params) =>
  axios
    .get('/accounting/total', { params })
    .then((data) => console.log(data) || data)
)

export const getSalaryPerTeamReq = reqWrapper((params) =>
  axios.get('/accounting/charts/salaryPerTeam', { params }).then((data) => data)
)
export const getSalaryPerMonthReq = reqWrapper((params) =>
  axios
    .get('/accounting/charts/salaryPerMonth', { params })
    .then((data) => data)
)
