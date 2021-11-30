import { LinearProgressBar, Glyph } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const ProgressBar = ({
  fileName,
  progressValue,
  onClose,
  onConfirm,
  failed,
  id,
}) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.details}>
        <span className={styles.name}>{fileName}</span>
        <span className={`${styles.value} ${failed && styles.failed}`}>
          {failed ? 'Upload failed' : `${progressValue}%`}
        </span>
        <div className={styles.buttons}>
          {progressValue === 100 && (
            <div className={styles.arrowCheck}>
              <Glyph
                size={17}
                name="arrowCheck"
                onClick={() => onConfirm(id)}
              />
            </div>
          )}
          <Glyph size={14} name="close" onClick={() => onClose(id)} />
        </div>
      </div>
      <div className={`${styles.bar} ${failed && styles.failed}`}>
        <LinearProgressBar value={progressValue} />
      </div>
    </div>
  )
}

export default ProgressBar
