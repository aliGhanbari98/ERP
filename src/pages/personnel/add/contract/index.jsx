/* eslint-disable quotes */
import { Form, Field } from 'react-final-form'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button, DatePicker, TextField } from 'base/form'
import validators from 'helpers/validator'
import styles from '../index.module.scss'

const form = [
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
    label: 'Contract number',
    placeholder: 'Enter contract number',
    validate: validators.required,
  },
  {
    name: 'salary',
    label: 'Salary*',
    placeholder: 'Enter salary',
    validate: validators.required,
  },
  {
    name: 'position',
    label: 'Position',
    placeholder: 'Enter position',
    validate: validators.required,
  },
]

const ContractSection = ({ setFields, setStage }) => {
  const handleNext = (data) => {
    setFields((prevState) => ({
      ...prevState,
      contracts: [{ ...data, contract_type: 'full-time' }],
    }))
    setStage('company')
  }

  return (
    <div className={styles.section}>
      <Headline type="H3">Contract information</Headline>

      <Form
        onSubmit={handleNext}
        render={({ handleSubmit, pristine, invalid }) => (
          <form className={styles.form}>
            <div className={styles.fields}>
              {form.map(
                ({ name, label, placeholder, type, validate, grow }, i) => (
                  <Field key={i} name={name} validate={validate}>
                    {({ input, meta }) => {
                      switch (type) {
                        case 'datepicker':
                          return (
                            <DatePicker
                              className={styles.datePicker}
                              startDateLabel={label}
                              startDateChange={input.onChange}
                              withCalendar
                              {...input}
                            />
                          )

                        default:
                          return (
                            <TextField
                              wrapperClassName={grow ? styles.grow : ''}
                              label={label}
                              placeholder={placeholder}
                              error={meta.modified && meta.error}
                              {...input}
                            />
                          )
                      }
                    }}
                  </Field>
                )
              )}
            </div>

            <div className={styles.buttons}>
              <Button
                appearance="secondary"
                color="secondary"
                onClick={() => setStage('personal')}
              >
                Back
              </Button>

              <Button
                type="submit"
                disabled={pristine || invalid}
                color="secondary"
                onClick={handleSubmit}
              >
                Next
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default ContractSection
