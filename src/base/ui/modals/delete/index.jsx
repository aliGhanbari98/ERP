import { Paragraph } from '@liquid-design/liquid-design-react'
import { Button } from 'base/form'
import { Modal } from 'base/ui'
import styles from './index.module.scss'

const DeleteModal = ({
  className,
  open,
  onClose,
  label = 'Warning',
  message,
  onConfirm,
}) => {
  const handleClose = () => {
    if (onClose instanceof Function) onClose()
  }

  return (
    <Modal
      overlayClassName={`${styles.deleteModal} ${className || ''}`}
      isOpen={open}
      onClose={handleClose}
      label={label}
    >
      <Paragraph type="lg">
        {!message ? 'Are you sure you want to delete?' : message}
      </Paragraph>

      <div className={styles.buttons}>
        <Button
          className={styles.deleteButton}
          onClick={() => onConfirm instanceof Function && onConfirm()}
        >
          Yes
        </Button>
        <Button appearance="secondary" color="secondary" onClick={handleClose}>
          No
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteModal
