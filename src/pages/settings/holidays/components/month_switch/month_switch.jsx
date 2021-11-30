// components
import { Glyph } from '@liquid-design/liquid-design-react'
import { Button } from 'base/form'
// style
import styles from './month_switch.module.scss'

const MonthSwitch = ({ date }) => {
  return (
    <div className={styles.switch}>
      <Button className={styles.arrow}>
        <Glyph size={22} name="arrowLeft" />
      </Button>

      <Button>{date}</Button>

      <Button className={styles.arrow}>
        <Glyph size={22} name="arrowRight" />
      </Button>
    </div>
  )
}

export default MonthSwitch
