import { useState } from 'react'
import { navigate } from '@reach/router'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button, TextField } from 'base/form'
import authStore from 'stores/AuthStore'
import { verifyReq, accessTokenReq } from 'queries/user'
import { Lang, lang } from 'helpers/language'
import { profileReq } from 'queries/profile'
import styles from './index.module.scss'

const Login = ({ userData }) => {
  const [code, setCode] = useState()

  const { username, selectedCompany } = userData || {}

  const handleLogin = (e) => {
    e.preventDefault()
    verifyReq({
      username,
      verification_code: code,
    })
      .then(() => accessTokenReq({ company_id: selectedCompany.id }))
      .then((data) => {
        localStorage.setItem('accessToken', data.access_token)
        localStorage.setItem('refreshToken', data.refresh_token)
        localStorage.setItem('loggedIn', true)
      })
      .then(() => profileReq())
      .then((res) => {
        authStore.userData = res
        navigate('/dashboard')
      })
      .catch((err) => {
        // TODO: Handle errors
      })
  }

  return (
    <div>
      <Headline type="H5">
        Please enter the code that has been sent to your phone
      </Headline>

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.inputs}>
          <TextField
            value={code}
            onChange={setCode}
            wrapperClassName={styles.textField}
            label="Enter code"
          />
          <Button color="secondary">Login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login
