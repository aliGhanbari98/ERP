import { Checkbox, TextField } from 'base/form'
import strings from 'helpers/strings'
import styles from './index.module.scss'

const accessors = (row, key) => {
  switch (key) {
    case 'from':
    case 'to': {
      const handler = key === 'from' ? row.fromChange : row.toChange
      const value = (
        (key === 'from' ? row.fromValue : row.toValue) || ''
      ).slice(0, 5)
      return (
        <TextField
          wrapperClassName={styles.fromToTextfield}
          placeholder="hh:mm"
          value={value}
          onChange={handler}
        />
      )
    }
    case 'off_days':
      return (
        <Checkbox
          isChecked={row.offday}
          iconSize={22}
          color="secondary"
          onChange={row.offdayChange}
        />
      )
    case 'day':
      return (
        <span style={{ color: row.offday ? 'red' : '', transition: '200ms' }}>
          {strings.weekDays[row[key]]}
        </span>
      )
    default:
      return ''
  }
}

export default accessors
