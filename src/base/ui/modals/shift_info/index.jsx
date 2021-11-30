import { useEffect, useState } from 'react'
import { Headline } from '@liquid-design/liquid-design-react'
import { Modal } from 'base/ui'
// eslint-disable-next-line import/no-unresolved
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg'
import strings from 'helpers/strings'
import styles from './index.module.scss'

const ShiftInfoModal = ({ open, setOpen, data }) => {
  const [shiftInfo, setShiftInfo] = useState()

  useEffect(() => {
    if (data)
      setShiftInfo({
        name: data.name,
        items: [
          {
            property: 'Work starting day',
            value: strings.weekDays[data.start_day_of_week],
          },
          {
            property: 'Calendar',
            value: data.country_of_holidays || '',
          },
          {
            property: 'Shift type',
            value: strings.shiftTypes[data.shift_type],
          },
          { property: 'Break time', value: `${data.break_time || 0} min` },
          {
            property: 'Work floating amount',
            value: `${data.max_flexible || 0} min`,
          },
          {
            property: 'Overtime ceiling per day',
            value: `${data.max_overtime || 0} h`,
          },
          {
            property: 'Off days',
            value: data.days
              .filter((day) => day.offday)
              .map((day) => strings.weekDays[day.day_title] || '')
              .join(', '),
          },
        ],
      })
  }, [data])

  const Label = () => (
    <div className={styles.label}>
      <ClockIcon />

      <Headline type="H4">{data && data.name}</Headline>
    </div>
  )

  return (
    <Modal
      overlayClassName={styles.shiftInfo}
      isOpen={open}
      onClose={() => setOpen(false)}
      label={<Label />}
    >
      {shiftInfo &&
        shiftInfo.items.map(({ property, value }) => (
          <div key={property} className={styles.item}>
            <Headline type="H5">{property}</Headline>

            <Headline type="H5">{value}</Headline>
          </div>
        ))}
    </Modal>
  )
}

export default ShiftInfoModal
