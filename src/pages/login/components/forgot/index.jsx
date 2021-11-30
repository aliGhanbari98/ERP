import { useState } from 'react'
import { navigate } from '@reach/router'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button, TextField, AuthInput } from 'base/form'
import { getOTPReq, verifyReq } from 'queries/user'
import { useToggle } from 'helpers/hooks'
import { Lang, lang } from 'helpers/language'
import styles from './index.module.scss'

const timeFormatter = (time) => (time > 9 ? `00:${time}` : `00:0${time}`)
const contactedByMap = (username) =>
  username.includes('@') ? 'Email' : 'Phone Number'

const Forgot = ({ verification, userData, handleUserData }) => {
  const [username, setUsername] = useState('')
  const [authCode, setAuthCode] = useState({
    content: '',
    remainingTime: 60,
    requested: false,
  })
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const { username: userName } = userData

  const getOtp = () => {
    toggleLoading()
    return getOTPReq({ username })
      .then((data) => {
        const { detail } = data
        const otpCode = detail.substr(detail.length - 5)
        console.log(detail)
        toggleLoading()
        setAuthCode((prevState) => ({
          ...prevState,
          content: otpCode,
          otpInput: otpCode.split(''),
        }))
        handleUserData(username, 'username')
        navigate('/forgot-verification')
      })
      .catch(() => {})
  }

  const verify = () => {
    toggleLoading()
    return verifyReq({
      username: userName,
      verification_code: authCode.content,
    })
      .then(({ access_token: accessToken, companies }) => {
        handleUserData(companies, 'companies')
        toggleLoading()
        localStorage.setItem('accessToken', accessToken)
        navigate('/forgot-company')
      })
      .catch()
  }

  const onButtonClick = !verification ? getOtp : verify

  const [intervalId, setIntervalId] = useState()

  if (authCode.remainingTime < 0) {
    setAuthCode((prevState) => ({
      ...prevState,
      requested: false,
      remainingTime: 60,
    }))

    clearInterval(intervalId)
  }

  const resendCode = () => {
    if (authCode.requested) return
    getOtp()
      .then(() => {
        const id = setInterval(() => {
          setAuthCode(({ remainingTime, ...rest }) => ({
            ...rest,
            requested: true,
            remainingTime: remainingTime - 1,
          }))
        }, 1000)
        setIntervalId(id)
      })
      .catch(() => {})
  }

  return (
    <div className={styles.forgot}>
      <Headline type="H2">Forgot Password</Headline>

      <div className={styles.desContainer}>
        <Headline type="H5">
          {!verification
            ? 'Enter your email or phone number to get the code'
            : `Enter the code that has been sent to your ${contactedByMap(
                username
              )}`}
        </Headline>
      </div>

      {verification ? (
        <div className={styles.authInputContainer}>
          <AuthInput
            label="Enter your code"
            fields={5}
            fieldWidth={23}
            fieldHeight={30}
            values={authCode.otpInput}
            onChange={(value) => {
              setAuthCode({ ...authCode, content: value })
            }}
          />
        </div>
      ) : (
        <TextField
          value={username}
          onChange={setUsername}
          wrapperClassName={styles.textField}
          label="Phone number/Email"
          placeholder="Enter your phone number or email"
        />
      )}

      {verification && (
        <div className={styles.resend}>
          <Button
            className={styles.ghostButton}
            appearance="ghost"
            onClick={resendCode}
          >
            {authCode.requested
              ? timeFormatter(authCode.remainingTime)
              : 'Resend'}
          </Button>
        </div>
      )}

      <Button
        color="secondary"
        disabled={!username && !authCode.content}
        onClick={onButtonClick}
        loading={isLoading}
      >
        {verification ? 'Login' : 'Send Code'}
      </Button>

      <Button
        className={styles.ghostButton}
        appearance="ghost"
        onClick={() => navigate('/')}
      >
        Back to login
      </Button>
    </div>
  )
}

export default Forgot
