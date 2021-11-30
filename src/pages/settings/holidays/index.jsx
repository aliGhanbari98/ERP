import { useState } from 'react'
// components
import { Paragraph } from '@liquid-design/liquid-design-react'
import { Modal } from 'base/ui'
import { Button, TextField } from 'base/form'
import { DeleteModal } from 'base/ui/modals'
import Card from './components/card/card'
import Switch from './components/month_switch/month_switch'

// style
import styles from './index.module.scss'

const items = [
  { day: 1, isHoliday: false, event: '' },
  { day: 2, isHoliday: false, event: '' },
  { day: 3, isHoliday: false, event: '' },
  { day: 4, isHoliday: false, event: '' },
  { day: 5, isHoliday: true, event: 'DDay', isToday: true },
  { day: 6, isHoliday: false, event: '' },
  { day: 7, isHoliday: false, event: '' },
  { day: 8, isHoliday: false, event: '' },
  { day: 9, isHoliday: false, event: '' },
  { day: 10, isHoliday: false, event: '' },
  { day: 11, isHoliday: false, event: '' },
  { day: 12, isHoliday: false, event: '' },
  { day: 13, isHoliday: false, event: '' },
  { day: 14, isHoliday: false, event: '' },
  { day: 15, isHoliday: false, event: '' },
  { day: 16, isHoliday: false, event: '' },
  { day: 17, isHoliday: false, event: '' },
  { day: 18, isHoliday: false, event: '' },
  { day: 19, isHoliday: false, event: '' },
  { day: 20, isHoliday: false, event: '' },
  { day: 21, isHoliday: false, event: '' },
  { day: 22, isHoliday: true, event: 'Freedom' },
  { day: 23, isHoliday: false, event: '' },
  { day: 24, isHoliday: false, event: '' },
  { day: 25, isHoliday: false, event: '' },
  { day: 26, isHoliday: false, event: '' },
  { day: 27, isHoliday: false, event: '' },
  { day: 28, isHoliday: false, event: '' },
  { day: 29, isHoliday: false, event: '' },
  { day: 30, isHoliday: false, event: '' },
  { day: 31, isHoliday: false, event: '' },
]

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const Holidays = () => {
  const [vacationModal, setVacationModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [description, setDescription] = useState('')

  const handleClick = (item) => {
    if (item.event === '') setVacationModal(true)
    else setDeleteModal(true)
  }

  return (
    <main className={styles.holidays}>
      <div className={styles.switch}>
        <Switch date="November 2020" />
      </div>
      <div className={styles.days}>
        {days.map((day) => (
          <span>{day}</span>
        ))}
      </div>
      <div className={styles.cards}>
        {items.map((item) => (
          <Card {...item} onClick={() => handleClick(item)} />
        ))}
      </div>

      <Modal
        overlayClassName={styles.modal}
        isOpen={vacationModal}
        onClose={() => setVacationModal(false)}
        label="Add vacation"
      >
        <Paragraph type="xs">2020/02/02</Paragraph>

        <div className={styles.inputs}>
          <TextField
            value={description}
            onChange={setDescription}
            label="Description"
          />
          <Button color="secondary" onClick={() => setVacationModal(false)}>
            Save
          </Button>
        </div>
      </Modal>

      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => setDeleteModal(false)}
        message="Are you sure you want to delete this vacation?"
      />
    </main>
  )
}

export default Holidays
