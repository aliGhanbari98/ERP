import { useState } from 'react'
import LazyLoad from 'react-lazyload'
import styles from './index.module.scss'

const Image = ({ className, src, alt, width, height, borderRadius }) => {
  const [loading, setLoading] = useState(true)

  const handlePlaceholder = () => setLoading(false)

  const handleError = (e) => {
    e.target.onerror = null
    e.target.src = '/images/blank_image.png'
    handlePlaceholder()
  }

  return (
    <div
      className={`${styles.image} ${!loading ? styles.loaded : ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <LazyLoad height={height} overflow>
        <div className={styles.placeholder} style={{ borderRadius }} />

        <img
          className={className}
          style={{ borderRadius }}
          src={src || '/images/blank_image.png'}
          alt={alt}
          onError={handleError}
          onLoad={handlePlaceholder}
        />
      </LazyLoad>
    </div>
  )
}

export default Image
