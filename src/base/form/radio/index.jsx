import { RadioButton } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const Radio = ({ className, isSelected, onClick, label, color }) => {
  return (
    <RadioButton
      className={`${className || ''} ${styles[color] || ''} ${
        isSelected ? styles.selected : ''
      }`}
      isSelected={isSelected}
      onClick={onClick}
      label={label}
    />
  )
}

export default Radio
