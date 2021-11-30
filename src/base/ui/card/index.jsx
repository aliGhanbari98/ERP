import { Headline, Paragraph } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const Card = ({ children, className, icon, title, subTitle, description }) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {children || (
        <div className={styles.content}>
          {icon && <div className={styles.icon}>{icon}</div>}

          <div className={styles.titles}>
            <Headline type="H2">{title}</Headline>
            <Headline type="H3">{subTitle}</Headline>
          </div>

          <div className={styles.description}>
            <Paragraph type="sm">{description}</Paragraph>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card
