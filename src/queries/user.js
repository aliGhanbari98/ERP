import axios from 'axios'
import { reqWrapper } from './wrapper'

export const registerReq = reqWrapper((body) =>
  axios
    .post('/auth/register', {
      ...body,
    })
    .then((data) => data)
)

export const loginReq = reqWrapper((body) =>
  axios
    .post('/auth/login', {
      ...body,
    })
    .then((data) => data)
)

export const googleLoginReq = reqWrapper((body) =>
  axios.post('/auth/login/google', { ...body }).then((data) => data)
)

export const getOTPReq = reqWrapper((body) =>
  axios
    .post('/auth/otp/send', {
      ...body,
    })
    .then((data) => data)
)

export const verifyReq = reqWrapper((body) =>
  axios
    .post('/auth/otp/verify', {
      ...body,
    })
    .then((data) => data)
)

export const accessTokenReq = reqWrapper((body) =>
  axios
    .post('/auth/token', {
      ...body,
    })
    .then((data) => data)
)

export const forgotPasswordReq = reqWrapper((body) =>
  axios
    .post('/auth/password/forgot', {
      ...body,
    })
    .then((data) => data)
)

export const updatePasswordReq = reqWrapper((body) =>
  axios
    .post('/auth/password/reset', {
      ...body,
    })
    .then((data) => data)
)
