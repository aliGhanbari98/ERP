// style
import styles from './card.module.scss'

const Card = ({ day, isHoliday, event, isToday, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.card} ${isHoliday && styles.isHoliday} ${
        isToday && styles.isToday
      }`}
      onClick={onClick}
    >
      <span>{day}</span>
      <div>
        <span>{event}</span>
      </div>
    </button>
  )
}

export default Card
