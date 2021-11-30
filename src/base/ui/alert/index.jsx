import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import styles from './index.module.scss'

const AlertTemplate = ({ style, options, message, close }) => (
  <div
    style={style}
    role="button"
    tabIndex="0"
    className={`${styles.alert} ${styles[options.type]}`}
    onClick={close}
  >
    {message}
  </div>
)

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  tranistion: transitions.FADE,
}

const Alert = ({ children }) => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      {children}
    </AlertProvider>
  )
}

export default Alert
