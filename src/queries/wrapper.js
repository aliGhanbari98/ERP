import { navigate } from '@reach/router'
import axios from 'axios'
import { authStore } from 'stores'
import 'configs/axios'

const refreshReq = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const accessToken = localStorage.getItem('accessToken')

  return axios
    .post(
      '/auth/token/refresh',
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => {
      localStorage.setItem('refreshToken', data.refresh_token)
      localStorage.setItem('accessToken', data.access_token)
    })
}

export const reqWrapper = (req) => (args, options = {}) => {
  const { validRoles } = options
  const { role } = authStore.userData || {}

  if (validRoles && validRoles.indexOf(role) === -1) return Promise.reject()

  return req(args, localStorage.getItem('accessToken'))
    .then(({ data }) => data.data)
    .catch((err) => {
      // console.log(err.response)
      if (!err.response) throw err

      if (err.response.status === 404) {
        // console.error(err.response)
      } else if (err.response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken')

        if (refreshToken)
          // eslint-disable-next-line consistent-return
          return refreshReq()
            .then(() => reqWrapper(req)(args, options))
            .catch((refreshErr) => {
              if (refreshErr.response.status === 401) {
                localStorage.clear()
                navigate('/')
              }
            })
        navigate('/')
      } else if (err.response.status === 409) {
        // console.error(err.response)
      } else if (err.response.status === 422) {
        // console.error(err.response)
      } else {
        // console.error(err.response)
      }
      throw err
    })
}

export default reqWrapper
