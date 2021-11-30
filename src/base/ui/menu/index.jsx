import { Icon } from '@liquid-design/liquid-design-react'
import { Button } from 'base/form'
import styles from './index.module.scss'

const Menu = ({ children, items = [], footerButton = {} }) => {
  return (
    <div className={styles.menu}>
      {children}

      <div className={styles.items}>
        {items.map(({ title, iconName, onClick }) => (
          <button
            key={`menu-${title}`}
            type="button"
            className={styles.item}
            onClick={onClick}
          >
            <Icon className={styles.icon} name={iconName} isFilled />

            <span>{title}</span>
          </button>
        ))}

        {footerButton.title && (
          <div className={styles.footerButton}>
            <Button appearance="ghost" onClick={footerButton.onClick}>
              {footerButton.title || ''}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
