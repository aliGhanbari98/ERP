import { Glyph, Paragraph } from '@liquid-design/liquid-design-react'
import { observer } from 'mobx-react-lite'
import { Button } from 'base/form'
import { Modal } from 'base/ui'
import { modalsStore } from 'stores'
import styles from './index.module.scss'

const types = {
  success: 'arrowCheck',
  error: 'close',
  info: 'attention',
}

const MessageModal = observer(
  ({ className, onClose, label, isOpen, message, type = 'success' }) => {
    const handleClose = () => {
      if (onClose instanceof Function) onClose()
      modalsStore.messageModal.isOpen = false
    }

    return (
      <Modal
        overlayClassName={`${styles.messageModal} ${className || ''}`}
        isOpen={isOpen}
        onClose={handleClose}
        label={label}
      >
        <div className={styles.message}>
          <Glyph size={24} name={types[type]} />
          <Paragraph type="lg">{message}</Paragraph>
        </div>

        <div className={styles.buttons}>
          <Button color="secondary" onClick={handleClose}>
            OK
          </Button>
        </div>
      </Modal>
    )
  }
)

export default MessageModal
