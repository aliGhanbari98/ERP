import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Field } from 'react-final-form'
import { Table, FormLayout } from 'base/ui'
import { TextField, Dropdown } from 'base/form'
import { DeleteModal, EmployeesModal } from 'base/ui/modals'
import tablesColumns from 'helpers/tablesColumns'
import inputsOptions from 'helpers/InputsOptions'
import rowsPerPage from 'helpers/tablesRowsCount'
import validators from 'helpers/validator'
import { useToggle } from 'helpers/hooks'
import { companyWorkplacesReq } from 'queries/companies'
import {
  createWorkplaceReq,
  deleteWorkplaceReq,
  updateWorkplaceReq,
  getWorkplaceEmployeesReq,
} from 'queries/workplaces'
import styles from './index.module.scss'

const defaultFields = {
  phone_number: null,
  name: null,
  country: null,
  city: null,
  address: null,
  radius: null,
  lat: 25.2048493,
  lon: 55.2707828,
  workplace_type: null,
}

const MapEvents = ({ state, setState }) => {
  const [dragging, setDragging] = useState(false)

  const map = useMapEvents({
    drag: () => {
      const coord = map.getCenter()
      setState((prevState) => ({
        ...prevState,
        lat: coord.lat,
        lon: coord.lng,
      }))
      setDragging(true)
    },
    dragend: () => setDragging(false),
  })

  useEffect(() => {
    if (!dragging) map.panTo({ lat: state.lat, lng: state.lon })
  }, [state, dragging])

  return null
}

const { workPlaceManagement: workPlaceManagementTablesRows } = rowsPerPage

const WorkplaceManagement = () => {
  const [state, setState] = useState(defaultFields)
  const [workplaces, setWorkplaces] = useState({ result: [] })
  const [employees, setEmployees] = useState()
  const [employeesModal, setEmployeesModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState()
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const handleDeleteModal = (item) => {
    setDeleteItem(item)
    setDeleteModal(true)
  }

  const handleEmployeesModal = (workplace) => {
    getWorkplaceEmployeesReq({ id: workplace.id })
      .then((data) => {
        setEmployees({ name: workplace.name, items: data.result })
        setEmployeesModal(true)
      })
      .catch(() => {})
  }

  const handleEdit = (item) => {
    const doc = document.getElementById('master-page')
    doc.scrollTo({ top: 0, behavior: 'smooth' })
    const { coordinates } = item.location
    setState({ ...item, lat: coordinates[0], lon: coordinates[1] })
  }

  const actions = [
    { iconName: 'bin', iconColor: '#e61e50', onClick: handleDeleteModal },
    { iconName: 'people', iconColor: '#F3BE2F', onClick: handleEmployeesModal },
    { iconName: 'pencil', iconColor: '#0D6C42', onClick: handleEdit },
  ]

  const formatters = {
    workPlaces: (data) => ({
      ...data,
      result: data.result.map((item) => ({ ...item, actions })),
    }),
  }

  const getWorkplaces = () =>
    companyWorkplacesReq({
      limit: workPlaceManagementTablesRows.workPlaces,
    })
      .then((data) => setWorkplaces(formatters.workPlaces(data)))
      .catch()

  const handleDelete = () => {
    deleteWorkplaceReq(deleteItem.id)
      .then(() =>
        setWorkplaces((prevState) => {
          const prev = [...prevState.result]
          const index = prev.findIndex((item) => item.id === deleteItem.id)

          prev.splice(index, 1)
          setDeleteModal(false)

          return { ...prevState, result: prev }
        })
      )
      .catch(() => {})
    getWorkplaces()
  }

  const handleConfirm = (fields) => {
    const reqBody = {
      ...fields,
      location: {
        type: 'Point',
        coordinates: [state.lat, state.lon],
      },
    }
    toggleLoading()
    ;(state.id
      ? updateWorkplaceReq({ id: state.id, body: reqBody })
      : createWorkplaceReq(reqBody)
    )
      .then((data) => {
        setWorkplaces((prevState) => {
          const prev = [...prevState.result]

          if (!state.id) prev.push({ ...data, actions })
          else {
            const index = prev.findIndex((item) => item.id === state.id)
            prev[index] = { ...data, actions }
          }

          return { ...prevState, data: prev }
        })
        setState(defaultFields)
        toggleLoading()
      })
      .catch(() => {})
    getWorkplaces()
  }

  const handleCancel = () => {
    setState(defaultFields)
  }

  useEffect(() => {
    getWorkplaces()
  }, [])

  return (
    <main className={styles.workplaceManagement}>
      <FormLayout
        className={styles.form}
        title="Define a new Workspace"
        okTitle="Confirm"
        cancelTitle="Cancel"
        okOnClick={handleConfirm}
        cancelOnClick={handleCancel}
        isLoading={isLoading}
      >
        <div className={styles.inputs}>
          <div className={styles.row}>
            <Field
              name="name"
              validate={validators.required}
              defaultValue={state.name}
            >
              {({ input, meta }) => (
                <TextField
                  label="Workplace Name"
                  placeholder="Enter Name"
                  className={styles.textField}
                  error={meta.modified && meta.error}
                  {...input}
                />
              )}
            </Field>

            <Field
              name="phone_number"
              validate={validators.required}
              defaultValue={state.phone_number}
            >
              {({ input, meta }) => (
                <TextField
                  label="Phone Number"
                  placeholder="Enter Number"
                  error={meta.modified && meta.error}
                  {...input}
                />
              )}
            </Field>
          </div>

          <div className={styles.row}>
            <Field
              name="country"
              validate={validators.required}
              defaultValue={state.country}
            >
              {({ input, meta }) => (
                <Dropdown
                  placeholder="Country"
                  onClick={(item) => input.onChange(item.name)}
                  defaultItem={{ value: state.country, key: 'name' }}
                  options={inputsOptions.dropdown.Country}
                  error={meta.modified && meta.error}
                />
              )}
            </Field>

            <Field
              name="city"
              validate={validators.required}
              defaultValue={state.city}
            >
              {({ input, meta }) => (
                <Dropdown
                  placeholder="City"
                  onClick={(item) => input.onChange(item.name)}
                  defaultItem={{ value: state.city, key: 'name' }}
                  options={inputsOptions.dropdown.City}
                  error={meta.modified && meta.error}
                />
              )}
            </Field>
          </div>

          <div className={styles.row}>
            <Field
              name="address"
              validate={validators.required}
              defaultValue={state.address}
            >
              {({ input, meta }) => (
                <TextField
                  label="Workplacle Address"
                  placeholder="Enter Address"
                  error={meta.modified && meta.error}
                  {...input}
                />
              )}
            </Field>

            <Field
              name="workplace_type"
              validate={validators.required}
              defaultValue={state.workplace_type}
            >
              {({ input, meta }) => (
                <Dropdown
                  label=" "
                  placeholder="Workplace Type"
                  onClick={(item) => input.onChange(item.value)}
                  defaultItem={{ value: state.workplace_type, key: 'value' }}
                  options={inputsOptions.dropdown.workplaceTypes}
                  error={meta.modified && meta.error}
                />
              )}
            </Field>
          </div>

          <div className={styles.row}>
            <Field
              name="radius"
              validate={validators.required}
              defaultValue={state.radius}
            >
              {({ input, meta }) => (
                <Dropdown
                  placeholder="Radius"
                  onClick={(item) => input.onChange(item.name)}
                  defaultItem={{ value: state.radius, key: 'name' }}
                  options={inputsOptions.dropdown.Radius}
                  error={meta.modified && meta.error}
                />
              )}
            </Field>
          </div>
        </div>
        <div className={styles.map}>
          <MapContainer
            center={[state.lat, state.lon]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={{ lat: state.lat, lng: state.lon }}>
              Marker
            </Marker>
            <MapEvents state={state} setState={setState} />
          </MapContainer>
        </div>
      </FormLayout>

      <Table
        title="Workplace management"
        columns={tablesColumns.workplaceManagement}
        rows={workplaces.result}
        dataFormatter={formatters.workplaces}
        rowsPerPage={workPlaceManagementTablesRows.workplaces}
        queryFunction={companyWorkplacesReq}
        stateHandler={setWorkplaces}
        size="large"
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

export default WorkplaceManagement
