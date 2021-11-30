import { useState } from 'react'
import { Headline } from '@liquid-design/liquid-design-react'
import { Router, navigate } from '@reach/router'
import { Lang, lang } from 'helpers/language'
import routes from './routes'
import styles from './index.module.scss'

const Login = () => {
  const [userData, setUserData] = useState({})

  const {
    username = window.atob(userData.username || ''),
    password = window.atob(userData.password || ''),
    selectedCompany,
    companies,
  } = userData || {}

  const handleUserData = (value, key) =>
    setUserData((prevState) => ({ ...prevState, [key]: value }))

  const propsMap = {
    loginForm: { handleUserData, userData: { username, password } },
    forgot: { handleUserData, userData: { username } },
    company: { handleUserData, userData: { companies, username } },
    verify: { userData: { username, selectedCompany } },
    companyForgot: { handleUserData, userData: { companies } },
  }

  return (
    <main className={styles.loginPage}>
      <div className={styles.info}>
        <Headline className={styles.brand} type="XBH3">
          atency
        </Headline>
        <Headline className={styles.desc} type="XH5">
          We are glad you are here.
        </Headline>

        <Headline className={styles.desc} type="XH5">
          Building a company helps you to control your business ethnically.
        </Headline>
      </div>

      <div className={styles.card}>
        <Router>
          {routes.map(({ Component, props, path, name }) => (
            <Component key={name} {...{ ...props, ...propsMap[name], path }} />
          ))}
        </Router>

        <div className={styles.policy}>
          <p>
            By logging you will accept our
            <button type="button" onClick={() => navigate('privacy-policy')}>
              Privacy policy
            </button>
            and
            <button type="button" onClick={() => navigate('terms-of-use')}>
              Terms of use
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login
