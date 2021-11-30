import { Button as LiquidButton } from '@liquid-design/liquid-design-react'
import { Spinner } from 'base/ui'
import styles from './index.module.scss'

const Button = ({
  className,
  appearance = 'primary',
  color = 'primary',
  disabled,
  type,
  icon,
  isIconOnRight,
  isIconFilled,
  children,
  loading,
  size,
  onClick,
}) => {
  return (
    <LiquidButton
      className={`${styles.button} ${styles[appearance] || ''} ${
        styles[`${color}Color`] || ''
      } ${className || ''}`}
      appearance={appearance}
      disabled={disabled}
      type={type}
      icon={icon}
      isIconOnRight={isIconOnRight}
      isIconFilled={isIconFilled}
      size={size}
      onClick={onClick}
    >
      {loading ? <Spinner /> : children}
    </LiquidButton>
  )
}

export default Button
