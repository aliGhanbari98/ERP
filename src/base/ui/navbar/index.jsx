import { Icon } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const Navbar = ({ className, tabs, activeTabIndex }) => {
  return (
    <nav className={`${styles.navBar} ${className || ''}`}>
      <ul>
        {tabs.map(({ iconName, iconSVG: IconSVG, title, onClick }, index) => (
          <li
            key={index}
            className={activeTabIndex === index ? styles.active : ''}
          >
            <button type="button" onClick={onClick && onClick}>
              {iconName ? <Icon name={iconName} isFilled /> : <IconSVG />}
              <span>{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
