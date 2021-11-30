import { useEffect, useState } from 'react'
import { Checkbox as LiquidCheckbox } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const Checkbox = ({
  className,
  disabled,
  isChecked,
  label,
  onChange,
  iconSize,
  color = 'secondary',
}) => {
  const handleChange = (value) => {
    if (onChange instanceof Function) {
      const state = isChecked !== undefined ? !isChecked : value
      onChange(state)
    }
  }

  return (
    <LiquidCheckbox
      className={`${className || ''} ${styles[color] || ''} ${
        isChecked || isChecked ? styles.checked : ''
      }`}
      disabled={disabled}
      isChecked={isChecked}
      label={label}
      onChange={handleChange}
      iconSize={iconSize}
    />
  )
}

export default Checkbox
