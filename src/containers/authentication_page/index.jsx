import { Theme } from '@liquid-design/liquid-design-react'
// eslint-disable-next-line import/no-unresolved
import AuthBG from 'assets/illustrations/auth_bg.svg'
import styles from './index.module.scss'

const AuthenticationPage = ({ children }) => {
  return (
    <Theme themeName="richPurple">
      <main
        className={styles.authenticationPage}
        style={{ background: `url(${AuthBG})` }}
      >
        {children}
      </main>
    </Theme>
  )
}

export default AuthenticationPage
