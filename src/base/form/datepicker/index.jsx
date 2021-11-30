import { DatePicker as LiquidDatePicker } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const DatePicker = ({
  className,
  disabled,
  withCalendar,
  rangeMode,
  defaultStartDate,
  defaultEndDate,
  startDateLabel,
  endDateLabel,
  startDateChange,
  endDateChange,
  format,
  color,
}) => {
  return (
    <LiquidDatePicker
      className={`${className} ${styles[color] || ''}`}
      disabled={disabled}
      withCalendar={withCalendar}
      rangeMode={rangeMode}
      defaultStartDate={defaultStartDate}
      defaultEndDate={defaultEndDate}
      startDateLabel={startDateLabel}
      endDateLabel={endDateLabel}
      startDateChange={startDateChange}
      endDateChange={endDateChange}
      format={format}
    />
  )
}

export default DatePicker
