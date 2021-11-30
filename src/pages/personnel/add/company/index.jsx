/* eslint-disable quotes */
import { useEffect, useState } from 'react'
import { Form, Field } from 'react-final-form'
import { Headline, Icon } from '@liquid-design/liquid-design-react'
import { Button, Dropdown, TextField } from 'base/form'
import { ShiftInfoModal } from 'base/ui/modals'
import inputOptions from 'helpers/InputsOptions'
import strings from 'helpers/strings'
import {
  companyShiftsReq,
  companyTeamsReq,
  companyWorkplacesReq,
} from 'queries/companies'
import { getTermsReq } from 'queries/terms'
import styles from '../index.module.scss'

const organizatinoal = [
  {
    name: 'team',
    placeholder: 'Team',
    type: 'dropdown',
    options: 'team',
  },
  {
    name: 'role',
    placeholder: 'Role',
    type: 'dropdown',
    options: 'role',
  },
]

const CompanySection = ({ setFields, setStage, handleSave, isLoading }) => {
  const [dpOptions, setdpOptions] = useState({
    team: [],
    role: inputOptions.dropdown.role,
    shift: [],
    workplace: [],
    terms: [],
  })
  const [shiftInfo, setShiftInfo] = useState()
  const [shiftModal, setShiftModal] = useState(false)

  useEffect(() => {
    companyTeamsReq()
      .then((data) =>
        setdpOptions((prevState) => ({ ...prevState, team: data.data }))
      )
      .catch(() => {})

    companyShiftsReq()
      .then((data) =>
        setdpOptions((prevState) => ({ ...prevState, shift: data.data }))
      )
      .catch(() => {})

    companyWorkplacesReq()
      .then((data) =>
        setdpOptions((prevState) => ({ ...prevState, workplace: data.data }))
      )
      .catch(() => {})

    getTermsReq()
      .then((data) =>
        setdpOptions((prevState) => ({ ...prevState, terms: data.data }))
      )
      .catch(() => {})
  }, [])

  const handleNext = (data) => {
    setFields((prevState) => {
      const prev = { ...prevState, ...data }

      prev.contracts[0] = {
        ...prev.contracts[0],
        contract_term_id: prev.term_id,
      }
      delete prev.term_id
      handleSave(prev)

      return { ...prev }
    })
  }

  const renderInput = (
    { label, placeholder, type, options, grow },
    input,
    meta
  ) => {
    switch (type) {
      case 'dropdown':
        return (
          <Dropdown
            className={styles.noGrow}
            {...input}
            label={label}
            placeholder={placeholder}
            options={dpOptions[options]}
            onClick={(item) => input.onChange(item.value)}
          />
        )

      default:
        return (
          <TextField
            wrapperClassName={`${grow ? styles.grow : ''} ${styles.noGrow}`}
            label={label}
            placeholder={placeholder}
            error={meta.modified && meta.error}
            {...input}
          />
        )
    }
  }

  return (
    <div className={styles.section}>
      <Headline type="H3">Orgazinational information</Headline>

      <Form
        onSubmit={handleNext}
        render={({ handleSubmit, pristine, invalid }) => (
          <form className={styles.form}>
            <div className={styles.fields}>
              {organizatinoal.map((props, i) => (
                <Field key={i} name={props.name}>
                  {({ input, meta }) => renderInput(props, input, meta)}
                </Field>
              ))}
            </div>

            <Headline type="H3">Personal</Headline>

            <div className={styles.fields}>
              <Field name="shift_id">
                {({ input }) => (
                  <Dropdown
                    className={styles.noGrow}
                    placeholder="Shift"
                    options={dpOptions.shift}
                    onClick={(item) => {
                      input.onChange(item.id)
                      setShiftInfo(item)
                    }}
                  />
                )}
              </Field>

              <Button
                className={`${styles.noGrow} ${styles.infoButton}`}
                color="secondary"
                disabled={!shiftInfo}
                onClick={(e) => {
                  e.preventDefault()
                  setShiftModal(true)
                }}
              >
                <span>Shift info</span>
                <Icon size={20} name="arrowRight" />
              </Button>

              <Field name="workplaces_ids">
                {({ input }) => (
                  <Dropdown
                    className={styles.noGrow}
                    placeholder="Workplace"
                    options={dpOptions.workplace}
                    onClick={(item) => input.onChange([item.id])}
                  />
                )}
              </Field>
            </div>

            <div className={styles.fields}>
              <Field name="term_id">
                {({ input }) => (
                  <Dropdown
                    className={styles.noGrow}
                    placeholder="Terms"
                    options={dpOptions.terms}
                    onClick={(item) => input.onChange(item.id)}
                  />
                )}
              </Field>

              <Button
                className={`${styles.noGrow} ${styles.infoButton}`}
                color="secondary"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <span>Term info</span>
                <Icon size={20} name="arrowRight" />
              </Button>
            </div>

            <div className={styles.buttons}>
              <Button
                appearance="secondary"
                color="secondary"
                onClick={() => setStage('contract')}
              >
                Back
              </Button>

              <Button
                color="secondary"
                onClick={handleSubmit}
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      />

      <ShiftInfoModal
        open={shiftModal}
        setOpen={setShiftModal}
        data={shiftInfo}
      />
    </div>
  )
}

export default CompanySection
