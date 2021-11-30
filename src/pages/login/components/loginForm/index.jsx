import { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { navigate } from '@reach/router'
import { useAlert } from 'react-alert'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button, TextField, Checkbox, Password } from 'base/form'
import { useToggle } from 'helpers/hooks'
import authStore from 'stores/AuthStore'
import { googleLoginReq, loginReq, accessTokenReq } from 'queries/user'
import { profileReq } from 'queries/profile'
// import { Lang, lang } from 'helpers/language'
// eslint-disable-next-line import/no-unresolved
import { ReactComponent as GoogleIcon } from 'assets/icons/google.svg'
import styles from './index.module.scss'

const LoginForm = ({ userData, handleUserData }) => {
  const alert = useAlert()
  const [errors, setErrors] = useState({ phone: null, code: null })
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const { username, password } = userData

  const handleLogin = (e) => {
    e.preventDefault()
    toggleLoading()

    loginReq({ username, password })
      .then((data) => {
        const { access_token: accessToken, companies } = data

        if (data.length === 0) navigate('/register')
        else {
          authStore.phone = username
          localStorage.setItem('username', window.btoa(username))
          localStorage.setItem('password', window.btoa(password))
          handleUserData(companies, 'companies')
          localStorage.setItem('accessToken', accessToken)

          if (data.companies.length === 1)
            accessTokenReq({ company_id: companies[0].id })
              .then((res) => {
                localStorage.setItem('accessToken', res.access_token)
                localStorage.setItem('refreshToken', res.refresh_token)
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
          else navigate('/company')
        }
      })
      .catch(({ response }) => {
        const { status, data } = response
        toggleLoading()
        if (status === 422 && data.detail && data.detail.length > 0)
          setErrors((prevState) => ({
            ...prevState,
            phone: data.detail[0].msg,
          }))
      })
  }

  const handleGoogleLogin = (data) => {
    if (data.tokenId) {
      googleLoginReq({ id_token: data.tokenId })
        .then((res) => console.log(res))
        .catch(() => {})
    } else if (data.error) {
      // alert.show(data.error, { type: 'error' })
    }
  }

  return (
    <div className={styles.loginForm}>
      <form className={styles.form} onSubmit={handleLogin}>
        <Headline type="H2">Login</Headline>

        <TextField
          value={username}
          onChange={(value) => handleUserData(value, 'username')}
          wrapperClassName={styles.textField}
          label="Phone number/Email"
          placeholder="Enter your phone number or email"
          error={errors.phone}
        />

        <Password
          value={password}
          onChange={(value) => handleUserData(value, 'password')}
          wrapperClassName={styles.textField}
          label="Password"
          placeholder="Enter your password"
        />

        <div className={styles.buttonsContainer}>
          <Checkbox
            className={styles.checkBox}
            iconSize={15}
            label="Remember me"
          />

          <Button
            className={styles.ghostButton}
            onClick={() => navigate('/forgot')}
            appearance="ghost"
            type="button"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          color="secondary"
          type="submit"
          disabled={!username || !password || isLoading}
          loading={isLoading}
        >
          Login
        </Button>
      </form>

      <div className={styles.splitter}>
        <span>Or login with</span>
      </div>

      <div className={styles.otherLoginServices}>
        <GoogleLogin
          clientId="95049199473-v5n6ca1najsmg9c7t9rr4orlhc2a0qbg.apps.googleusercontent.com"
          render={({ onClick, disabled }) => (
            <button
              className={`${styles.google} ${disabled ? styles.disabled : ''}`}
              type="button"
              onClick={onClick}
              disabled={disabled}
            >
              <GoogleIcon />

              <Headline type="H6">Google</Headline>
            </button>
          )}
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  )
}

export default LoginForm
