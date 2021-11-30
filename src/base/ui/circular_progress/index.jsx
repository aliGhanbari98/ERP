import { useEffect, useRef } from 'react'
import { CircularProgressBar } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const CircularProgress = ({ label, value, progressValue, disabled }) => {
  const progressEl = useRef()

  useEffect(() => {
    if (progressEl.current) {
      const el = progressEl.current
      const divs = el.querySelectorAll('div')
      divs[2].innerHTML = value || '0'
    }
  }, [progressEl, value])

  return (
    <div
      ref={progressEl}
      className={`${styles.progress} ${
        progressValue > 0 ? styles.hasValue : ''
      } ${value.includes(' ') && styles.smallerText}`}
    >
      <CircularProgressBar
        label={label}
        value={progressValue}
        disabled={disabled}
        useThemeColors
      />
    </div>
  )
}

export default CircularProgress
