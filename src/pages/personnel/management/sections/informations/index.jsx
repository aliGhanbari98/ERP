/* eslint-disable quotes */
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Field } from 'react-final-form'
import { Headline, Icon, Paragraph } from '@liquid-design/liquid-design-react'
import { FormLayout, Tooltip } from 'base/ui'
import { Button, DatePicker, Dropdown, TextField } from 'base/form'
import { ShiftInfoModal } from 'base/ui/modals'
import { authStore } from 'stores'
import { companyShiftsReq, companyTeamsReq } from 'queries/companies'
import { getTermsReq } from 'queries/terms'
import inputOptions from 'helpers/InputsOptions'
import strings from 'helpers/strings'
import validators from 'helpers/validator'
import styles from './index.module.scss'

const fields = {
  personal: [
    {
      name: 'national_code',
      label: 'ID Number*',
      validate: validators.required,
    },
    {
      name: 'gender',
      label: ' ',
      placeholder: 'Sex',
      type: 'dropdown',
      options: 'gender',
      validate: validators.required,
    },
    {
      name: 'date_of_birth',
      label: 'Birthday',
      type: 'datepicker',
    },
    {
      name: 'father_name',
      label: "Father's name",
    },
    {
      name: 'mobile_number',
      label: 'Phone number*',
      validate: validators.required,
    },
    {
      name: 'phone_number',
      label: 'Home number',
    },
    {
      name: 'employee_code',
      label: 'Personal code*',
      validate: validators.required,
    },
    {
      name: 'email',
      label: 'Email*',
      validate: validators.required,
    },
    {
      name: 'address',
      label: 'Address',
    },
  ],
  contract: [
    {
      name: 'start_datetime',
      label: 'Contract start date*',
      type: 'datepicker',
      validate: validators.required,
    },
    {
      name: 'end_datetime',
      label: 'Contract end date*',
      type: 'datepicker',
      validate: validators.required,
    },
    {
      name: 'work_start_datetime',
      label: 'Working start date*',
      type: 'datepicker',
      validate: validators.required,
    },
    {
      name: 'work_end_datetime',
      label: 'Working end date*',
      type: 'datepicker',
      validate: validators.required,
    },
    {
      name: 'contract_number',
      label: 'Contact number',
    },
    {
      name: 'salary',
      label: 'Salary*',
      validate: validators.required,
    },
    {
      name: 'position',
      label: 'Position',
    },
    {
      name: 'work_hours_per_month',
      label: 'Work hours per month*',
      // validate: validators.required,
    },
    {
      name: 'contract_type',
      label: ' ',
      placeholder: 'Contract type',
      type: 'dropdown',
      options: 'contractTypes',
      validate: validators.required,
    },
  ],
}

const Informations = observer(({ user, onConfirm, isLoading }) => {
  const { userData } = authStore
  const [activeTab, setActiveTab] = useState(0)
  const [dpOptions, setDpOptions] = useState({
    gender: inputOptions.dropdown.gender,
    terms: [],
    contractTypes: inputOptions.dropdown.contractTypes,
  })
  const [teams, setTeams] = useState([])
  const [shifts, setShifts] = useState([])
  const [shiftModal, setShiftModal] = useState(false)
  const [shiftInfo, setShiftInfo] = useState()

  const renderInput = (
    { name, label, placeholder, type, options, grow },
    input,
    meta
  ) => {
    switch (type) {
      case 'dropdown':
        return (
          <Dropdown
            className={styles.noGrow}
            label={label}
            placeholder={placeholder}
            options={dpOptions[options]}
            defaultItem={{ value: user[name], key: 'value' }}
            onClick={(item) => input.onChange(item.value)}
            disabled={userData.role !== 'admin'}
            {...input}
          />
        )

      case 'datepicker':
        return (
          <DatePicker
            className={styles.datePicker}
            startDateLabel={label}
            startDateChange={input.onChange}
            // TODO: Fix datepicker default value
            defaultStartDate={input.value}
            withCalendar
            disabled={userData.role !== 'admin'}
            {...input}
          />
        )

      default:
        return (
          <TextField
            wrapperClassName={`${grow ? styles.grow : ''} ${styles.noGrow}`}
            label={label}
            placeholder={placeholder}
            disabled={userData.role !== 'admin'}
            error={meta.modified && meta.error}
            {...input}
          />
        )
    }
  }

  const handleShiftInfo = (item) => {
    setShiftInfo(item)
  }

  useEffect(() => {
    if (user.shift) handleShiftInfo(user.shift)

    companyTeamsReq(null, { validRoles: ['admin'] })
      .then(({ result }) => setTeams(result))
      .catch(() => {})

    companyShiftsReq(null, { validRoles: ['admin'] })
      .then(({ result }) => setShifts(result))
      .catch(() => {})

    getTermsReq(null, { validRoles: ['admin'] })
      .then(({ result }) =>
        setDpOptions((prevState) => ({ ...prevState, terms: result }))
      )
      .catch(() => {})
  }, [user])

  const handleConfirm = (data) => {
    switch (activeTab) {
      case 0:
        onConfirm({
          ...data,
          date_of_birth:
            data.date_of_birth && data.date_of_birth instanceof Date
              ? data.date_of_birth.toISOString().substr(0, 10)
              : data.date_of_birth,
        })
        break
      case 1:
        onConfirm({
          contracts: [
            {
              start_datetime: data.start_datetime,
              end_datetime: data.end_datetime,
              work_start_datetime: data.work_start_datetime,
              work_end_datetime: data.work_end_datetime,
              contract_number: data.contract_number,
              salary: data.salary,
              position: data.position,
              contract_term_id: data.contract_term_id,
              contract_type: data.contract_type,
              work_hours_per_month: data.work_hours_per_month,
            },
          ],
        })
        break
      case 2:
        onConfirm({
          ...(userData.role !== 'admin' && userData.id !== user.id
            ? { role: data.role }
            : {}),
          shift_id: data.shift.id,
          team: data.team,
        })
        break

      default:
        break
    }
  }

  const handleCancel = () => {}

  return (
    <div className={styles.informations}>
      <div className={styles.tabs}>
        {['Personal', 'Contract', 'Company'].map((tab, index) => (
          <button
            key={`tab-${tab}`}
            type="button"
            className={`${styles.tab} ${
              activeTab === index ? styles.active : ''
            }`}
            onClick={() => setActiveTab(index)}
            title={`${tab} information`}
          >
            {`${tab} information`}
          </button>
        ))}
      </div>

      <FormLayout
        okTitle="Save"
        okOnClick={handleConfirm}
        cancelTitle="Cancel"
        cancelOnClick={handleCancel}
        isLoading={isLoading}
      >
        {activeTab === 0 && (
          <div className={styles.personal}>
            {fields.personal.map((field) => (
              <Field
                key={field.name}
                name={field.name}
                initialValue={user[field.name]}
                validate={field.validate || null}
              >
                {({ input, meta }) => renderInput(field, input, meta)}
              </Field>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className={styles.contract}>
            {fields.contract.map((field) => (
              <Field
                key={field.name}
                name={field.name}
                initialValue={user.contracts && user.contracts[0][field.name]}
                validate={field.validate || null}
              >
                {({ input, meta }) => renderInput(field, input, meta)}
              </Field>
            ))}

            <Field name="contract_term_id" validate={validators.required}>
              {({ input, meta }) => (
                <Dropdown
                  placeholder="Terms"
                  label=" "
                  options={dpOptions.terms}
                  disabled={userData.role !== 'admin'}
                  onClick={(item) => input.onChange(item.id)}
                  error={meta.modified && meta.error}
                />
              )}
            </Field>

            <div className={styles.infoButton}>
              <Button
                color="secondary"
                type="button"
                onClick={(e) => e.preventDefault()}
              >
                <span>Terms info</span>
                <Icon size={20} name="arrowRight" />
              </Button>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className={styles.company}>
            <div className={styles.organizational}>
              <Headline type="H3">Organizational</Headline>

              <div className={styles.inputs}>
                <Field name="team" initialValue={user.team}>
                  {({ input, meta }) => (
                    <Dropdown
                      placeholder="Team"
                      options={
                        (teams.length > 0 && teams) ||
                        (fields.team && [fields.team]) ||
                        []
                      }
                      onClick={(item) => input.onChange(item)}
                      defaultItem={{
                        value: user.team && user.team.id,
                        key: 'id',
                      }}
                      disabled={userData.role !== 'admin'}
                      error={meta.modified && meta.error}
                    />
                  )}
                </Field>

                <Field name="role" initialValue={user.role}>
                  {({ input, meta }) => (
                    <Dropdown
                      placeholder="Role"
                      options={inputOptions.dropdown.role}
                      defaultItem={{ value: user.role, key: 'value' }}
                      onClick={(item) => input.onChange(item.value)}
                      disabled={userData.role !== 'admin'}
                      error={meta.modified && meta.error}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className={styles.personalInfo}>
              <Headline type="H3">Individual</Headline>

              <div className={styles.inputs}>
                <Field name="shift" initialValue={user.shift}>
                  {({ input, meta }) => (
                    <Dropdown
                      placeholder="Shift"
                      options={
                        (shifts.length > 0 && shifts) ||
                        (user.shift && [user.shift]) ||
                        []
                      }
                      onClick={(item) => {
                        input.onChange(item)
                        handleShiftInfo(item)
                      }}
                      defaultItem={{
                        value: user.shift && user.shift.id,
                        key: 'id',
                      }}
                      disabled={userData.role !== 'admin'}
                      error={meta.modified && meta.error}
                    />
                  )}
                </Field>

                <Button
                  type="button"
                  color="secondary"
                  className={styles.infoButton}
                  onClick={(e) => {
                    e.preventDefault()
                    setShiftModal(true)
                  }}
                >
                  <span>Shift info</span>
                  <Icon size={20} name="arrowRight" />
                </Button>
              </div>

              {/* <div className={styles.inputs}>
                <TextField
                  wrapperClassName={styles.workFloat}
                  label="Work floating amount (Minute)"
                  elemAfter={
                    <Tooltip title="Work floating">
                      <Paragraph type="sm">
                        The period of time when the employee can delay the start
                        of the shift and compensate for overtime at the end of
                        the shift on the same day.
                      </Paragraph>
                    </Tooltip>
                  }
                  disabled={userData.role !== 'admin'}
                />
              </div> */}
            </div>
          </div>
        )}
      </FormLayout>

      <ShiftInfoModal
        open={shiftModal}
        setOpen={setShiftModal}
        data={shiftInfo}
      />
    </div>
  )
})

export default Informations
