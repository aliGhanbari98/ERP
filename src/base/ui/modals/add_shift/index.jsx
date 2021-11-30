import { useEffect, useState } from 'react'
import { FormTable, Modal } from 'base/ui'
import { Button, Dropdown } from 'base/form'
import tablesColumns from 'helpers/tablesColumns'
import inputOptions from 'helpers/InputsOptions'
import styles from './index.module.scss'

const weekDayOptions = [
  {
    name: 'Saturday',
    value: 'saturday',
  },
  {
    name: 'Monday',
    value: 'monday',
  },
]

const calendarOptions = [
  {
    name: 'UAE',
    value: 'uae',
  },
  {
    name: 'Iran',
    value: 'iran',
  },
]

const AddShiftModal = ({
  open,
  onClose,
  onConfirm,
  states,
  setStates,
  rows,
  setRows,
}) => {
  const handleDayChange = (value, key, index) => {
    setRows((prevState) => {
      const prev = prevState
      prev[index][key] = value
      return [...prev]
    })
  }

  const generateRows = (weekDays) => {
    setRows([
      ...weekDays.map((day, index) => ({
        day: day.value,
        fromValue: states.days ? states.days[index].start_time : '09:00',
        fromChange: (value) => handleDayChange(value, 'fromValue', index),
        toValue: states.days ? states.days[index].end_time : '18:00',
        toChange: (value) => handleDayChange(value, 'toValue', index),
        offday: states.days ? states.days[index].offday : false,
        offdayChange: (value) => handleDayChange(value, 'offday', index),
      })),
    ])
  }

  useEffect(() => {
    // TODO: Generate start day of week automatically
    if (states)
      generateRows(
        states.start_day_of_week === 'monday'
          ? inputOptions.dropdown.weekDays
          : inputOptions.dropdown.weekDaysIR
      )
  }, [states])

  const handleApply = () => {
    if (onConfirm instanceof Function) onConfirm()
  }

  return (
    <Modal
      overlayClassName={styles.addShift}
      isOpen={open}
      onClose={onClose}
      label="Add Shift"
    >
      <div className={styles.card}>
        <div className={styles.inputs}>
          <Dropdown
            placeholder="Week start day"
            options={weekDayOptions}
            defaultItem={{ value: states.start_day_of_week, key: 'value' }}
            onClick={(item) =>
              setStates((prevState) => ({
                ...prevState,
                start_day_of_week: item.value,
              }))
            }
          />

          <Dropdown
            placeholder="Country calendar"
            options={calendarOptions}
            defaultItem={{ value: states.country_of_holidays, key: 'value' }}
            onClick={(item) =>
              setStates((prevState) => {
                const prev = prevState
                prev.country_of_holidays = item.value
                return prev
              })
            }
          />
        </div>

        <FormTable
          className={styles.table}
          columns={tablesColumns.addShift}
          rows={rows}
          size="large"
        />

        <div className={styles.footer}>
          <Button color="secondary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddShiftModal
