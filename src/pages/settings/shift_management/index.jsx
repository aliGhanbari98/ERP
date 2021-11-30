import { useEffect, useState } from 'react'
import { Field } from 'react-final-form'
import { Icon } from '@liquid-design/liquid-design-react'
import { FormLayout, Table } from 'base/ui'
import { Button, Dropdown, TextField } from 'base/form'
import {
  AddShiftModal,
  DeleteModal,
  EmployeesModal,
  ShiftInfoModal,
} from 'base/ui/modals'
import tablesColumns from 'helpers/tablesColumns'
import inputOptions from 'helpers/InputsOptions'
import { useToggle } from 'helpers/hooks'
import filteringHandler from 'helpers/filteringHandler'
import rowsPerPage from 'helpers/tablesRowsCount'
import validators from 'helpers/validator'
import { companyShiftsReq } from 'queries/companies'
import {
  createShiftReq,
  deleteShiftReq,
  shiftUsersReq,
  updateShiftReq,
} from 'queries/shifts'
import styles from './index.module.scss'

const defaultFields = {
  name: '',
  shift_type: '',
  break_time: '',
  public_holidays: false,
  country_of_holidays: '',
  fix_start_time: false,
  start_day_of_week: '',
}

const { shiftManagement: shiftManagementTablesRows } = rowsPerPage

const ShiftManagement = () => {
  const [states, setStates] = useState(defaultFields)
  const [shiftsData, setShiftsData] = useState({ result: [] })
  const [shiftInfoData, setShiftInfoData] = useState()
  const [addShiftRows, setAddShiftRows] = useState([])
  const [addShiftModal, setAddShiftModal] = useState()
  const [employees, setEmployees] = useState()
  const [employeesModal, setEmployeesModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState()
  const [deleteItem, setDeleteItem] = useState()
  const [infoModal, setInfoModal] = useState(false)
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const handleEdit = (item) => {
    setStates(item)
    const doc = document.getElementById('master-page')
    doc.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleInfoModal = (item) => {
    setShiftInfoData(item)
    setInfoModal(true)
  }

  const handleEmployeesModal = (row) => {
    shiftUsersReq({ id: row.id })
      .then((data) => {
        setEmployees({ name: row.name, items: data.data })
        setEmployeesModal(true)
      })
      .catch(() => {})
  }

  const handleDelete = (item) => {
    if (item) {
      setDeleteItem(item)
      setDeleteModal(true)
    } else {
      deleteShiftReq(deleteItem.id)
        .then(() =>
          setShiftsData((prevState) => {
            const prevData = [...prevState.result]

            const index = prevData.findIndex(
              (dataItem) => dataItem.id === deleteItem.id
            )
            prevData.splice(index, 1)
            setStates(defaultFields)
            setDeleteModal(false)

            return { ...prevState, result: prevData }
          })
        )
        .catch(() => {})
    }
  }

  const handleConfirm = (fields) => {
    toggleLoading()
    ;(states.id
      ? updateShiftReq({ id: states.id, body: { ...states, ...fields } })
      : createShiftReq({ ...states, ...fields })
    )
      .then((data) => {
        setShiftsData((prevState) => {
          const prevData = [...prevState.result]

          if (!states.id)
            prevData.push({
              ...data,
              onEdit: handleEdit,
              onInfo: handleInfoModal,
              onEmployees: handleEmployeesModal,
              onDelete: handleDelete,
            })
          else {
            const index = prevData.findIndex((item) => states.id === item.id)
            prevData[index] = {
              ...data,
              onEdit: handleEdit,
              onInfo: handleInfoModal,
              onEmployees: handleEmployeesModal,
              onDelete: handleDelete,
            }
          }

          setStates(defaultFields)
          return { ...prevState, result: prevData }
        })
        toggleLoading()
      })
      .catch(() => {})
  }

  const handleAddShiftModal = () => {
    setStates((prevState) => ({
      ...prevState,
      days: [
        ...addShiftRows.map((row) => ({
          day_title: row.day,
          start_time: row.fromValue,
          end_time: row.toValue,
          offday: row.offday,
        })),
      ],
    }))
    setAddShiftModal(false)
  }

  const formatters = {
    shifts: (data, isSingle) =>
      isSingle
        ? {
            total: 1,
            result: {
              ...data.result,
              onEdit: handleEdit,
              onInfo: handleInfoModal,
              onEmployees: handleEmployeesModal,
              onDelete: handleDelete,
            },
          }
        : {
            ...data,
            result: data.result.map((item) => ({
              ...item,
              onEdit: handleEdit,
              onInfo: handleInfoModal,
              onEmployees: handleEmployeesModal,
              onDelete: handleDelete,
            })),
          },
  }

  useEffect(() => {
    companyShiftsReq({ limit: shiftManagementTablesRows.shifts })
      .then((data) => setShiftsData(formatters.shifts(data)))
      .catch(() => {})
  }, [])

  return (
    <main className={styles.shiftManagement}>
      <FormLayout
        className={styles.form}
        title="Add shift"
        okTitle={states.id ? 'Update' : 'Add'}
        okOnClick={handleConfirm}
        isLoading={isLoading}
      >
        <div className={styles.inputs}>
          <Field
            name="name"
            validate={validators.required}
            defaultValue={states.name}
          >
            {({ input, meta }) => (
              <TextField
                label="Shift name"
                placeholder="Calistu shift"
                error={meta.modified && meta.error}
                {...input}
              />
            )}
          </Field>

          <Field
            name="shift_type"
            validate={validators.required}
            defaultValue={states.shift_type}
          >
            {({ input, meta }) => (
              <Dropdown
                label=" "
                placeholder="Shift Type"
                options={inputOptions.dropdown.shiftTypes.slice(-3)}
                onClick={(item) => input.onChange(item.value)}
                defaultItem={{ value: states.shift_type, key: 'value' }}
                error={meta.modified && meta.error}
              />
            )}
          </Field>

          <Field
            name="break_time"
            validate={validators.required}
            defaultValue={states.break_time}
          >
            {({ input, meta }) => (
              <TextField
                key="breakTime"
                label="Break time (minute)"
                placeholder="50"
                error={meta.modified && meta.error}
                {...input}
              />
            )}
          </Field>

          <Button
            className={styles.modalButton}
            color="secondary"
            isIconOnRight
            onClick={(e) => {
              e.preventDefault()
              setAddShiftModal(true)
            }}
          >
            <span>Set work times</span>
            <Icon size={20} name="arrowRight" />
          </Button>
        </div>
      </FormLayout>

      <Table
        title="Shifts"
        columns={tablesColumns.shifts}
        rows={shiftsData.result}
        size="large"
        toolbar={{
          tableType: 'singleDropDown',
          options: inputOptions.dropdown.shiftTypes,
          placeholder: 'Shift type',
          onClick: ({ value }) => {
            filteringHandler({
              query: companyShiftsReq,
              formatter: formatters.shifts,
              params: {
                shift_type: value,
                limit: shiftManagementTablesRows.shifts,
              },
              stateHandler: setShiftsData,
            })
          },
        }}
        rowsPerPage={shiftManagementTablesRows.shifts}
        pages={shiftsData.total}
        withPagination
        queryFunction={companyShiftsReq}
        stateHandler={setShiftsData}
        dataFormatter={formatters.shifts}
      />

      <ShiftInfoModal
        open={infoModal}
        setOpen={setInfoModal}
        data={shiftInfoData}
      />

      <AddShiftModal
        open={addShiftModal}
        onClose={() => setAddShiftModal(false)}
        onConfirm={handleAddShiftModal}
        states={states}
        setStates={setStates}
        rows={addShiftRows}
        setRows={setAddShiftRows}
      />

      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
      />

      <EmployeesModal
        open={employeesModal}
        setOpen={setEmployeesModal}
        data={employees}
      />
    </main>
  )
}

export default ShiftManagement
