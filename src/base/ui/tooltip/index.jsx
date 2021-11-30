import {
  Tooltip as LiquidTooltip,
  Headline,
} from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const Tooltip = ({
  children,
  title,
  wall,
  side,
  customTrigger,
  isOpen,
  onToggle,
  color = 'secondary',
}) => {
  return (
    <LiquidTooltip
      className={styles[color] || ''}
      wall={wall}
      side={side}
      customTrigger={customTrigger}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className={styles.tooltipConent}>
        {title && <Headline type="H5">{title}</Headline>}
        {children}
      </div>
    </LiquidTooltip>
  )
}

export default Tooltip
