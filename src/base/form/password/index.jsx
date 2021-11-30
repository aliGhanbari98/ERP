import { useState } from 'react'
import { ReactComponent as EyeIcon } from '../../../assets/icons/eye.svg'
import TextField from '../textfield'
import styles from './index.module.scss'

const Password = ({ value, onChange, label, placeholder, error, disabled }) => {
  const [type, setType] = useState('password')

  return (
    <div className={styles.password}>
      <TextField
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        type={type}
      />

      <button
        tabIndex="0"
        onMouseDown={() => {
          setType('text')
        }}
        onMouseUp={() => {
          setType('password')
        }}
        type="button"
      >
        <EyeIcon />
      </button>
    </div>
  )
}

export default Password
