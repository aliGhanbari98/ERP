// components
import { TextField, Checkbox } from 'base/form'
// styles
import styles from './index.module.scss'

const Overal = ({ handleTermData, data }) => {
  return (
    <div className={styles.overal}>
      <div className={styles.nameField}>
        <TextField
          placeholder="Enter template name"
          label="Template name*"
          value={data.name}
          onChange={(value) => handleTermData('name', value)}
        />
      </div>
      <div className={styles.checkBoxes}>
        <Checkbox
          label="Consider weekends in salary"
          isChecked={data.is_weekend_included}
          onChange={(value) => handleTermData('is_weekend_included', value)}
        />
        <Checkbox
          label="Consider holidays in salary"
          isChecked={data.is_holiday_included}
          onChange={(value) => handleTermData('is_holiday_included', value)}
        />
      </div>
      <div className={styles.timeFields}>
        <TextField
          placeholder="ex: 30"
          label="Work floating amount (Minute)"
          value={data.max_flexible}
          onChange={(value) => handleTermData('max_flexible', Number(value))}
        />
        <TextField
          placeholder="ex: 20"
          label="Amount of leave per month* (Hour)"
          value={data.max_eligible_leave}
          onChange={(value) =>
            handleTermData('max_eligible_leave', Number(value))
          }
        />
      </div>
    </div>
  )
}

export default Overal
