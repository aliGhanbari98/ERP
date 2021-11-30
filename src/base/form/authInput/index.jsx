/* eslint-disable jsx-a11y/label-has-associated-control */
import ReactCodeInput from 'react-verification-code-input'
import styles from './index.module.scss'

const Login = ({
  fields,
  fieldWidth,
  fieldHeight,
  values,
  onChange,
  label,
}) => (
  <div className={styles.authInput}>
    <label>{label}</label>
    <ReactCodeInput
      className={styles.verificationInput}
      fields={fields}
      fieldWidth={fieldWidth}
      fieldHeight={fieldHeight}
      values={values || ['', '', '', '', '']}
      onChange={onChange}
    />
  </div>
)

export default Login
