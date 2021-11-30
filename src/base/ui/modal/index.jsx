import { Modal as LiquidModal } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const Modal = ({
  children,
  className,
  overlayClassName,
  isOpen,
  onClose,
  label,
}) => {
  return (
    <LiquidModal
      className={className || ''}
      overlayAuxClassName={`${styles.modal} ${overlayClassName || ''}`}
      open={isOpen}
      onClose={onClose}
      label={label}
    >
      {children}
    </LiquidModal>
  )
}

export default Modal
