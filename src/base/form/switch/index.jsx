/* eslint-disable jsx-a11y/label-has-associated-control */
import { Glyph } from '@liquid-design/liquid-design-react'
import { useState } from 'react'
import styles from './index.module.scss'

const Switch = ({ checked, onChange }) => {
  const [state, setState] = useState(checked || false)

  const handleChange = (value) => {
    setState(value)
    if (onChange instanceof Function) onChange(value)
  }

  return (
    <label className={`${styles.switch} ${state ? styles.checked : ''}`}>
      <Glyph size={20} className={styles.icon} name="arrowCheck" />
      <input
        type="checkbox"
        checked={state}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <Glyph size={16} className={styles.icon} name="close" />
    </label>
  )
}

export default Switch
