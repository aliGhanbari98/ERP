/* eslint-disable quotes */
import { Form, Field } from 'react-final-form'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button, Dropdown, TextField } from 'base/form'
import inputOptions from 'helpers/InputsOptions'
import validators from 'helpers/validator'
import styles from '../index.module.scss'

const form = [
  {
    name: 'first_name',
    label: 'Name*',
    placeholder: 'Enter name',
    validate: validators.required,
  },
  {
    name: 'last_name',
    label: 'Last name*',
    placeholder: 'Enter last name',
    validate: validators.required,
  },
  {
    name: 'employee_code',
    label: 'Personnel code*',
    placeholder: 'Enter code',
    validate: validators.required,
  },
  {
    name: 'national_code',
    label: 'ID number* (This will set as default password)',
    placeholder: 'Enter ID number',
    validate: validators.composeValidators(
      validators.required,
      validators.minLength(8)
    ),
  },
  {
    name: 'father_name',
    label: "Father's Name",
    placeholder: "Enter father's name",
  },
  {
    name: 'gender',
    label: ' ',
    placeholder: 'Sex',
    type: 'dropdown',
    options: inputOptions.dropdown.gender,
  },
  {
    name: 'phone_number',
    label: 'Home number',
    placeholder: 'Enter home number',
  },
  {
    name: 'mobile_number',
    label: 'Mobile number*',
    placeholder: 'Enter mobile number',
    validate: validators.composeValidators(
      validators.required,
      validators.phone
    ),
  },
  {
    name: 'email',
    label: 'Email*',
    placeholder: 'Enter email',
    validate: validators.composeValidators(
      validators.required,
      validators.email
    ),
  },
  {
    name: 'address',
    label: 'Address*',
    placeholder: 'Enter address',
    validate: validators.required,
    grow: 1,
  },
]

const PersonalSection = ({ setFields, setStage }) => {
  const handleNext = (data) => {
    setFields((prevState) => ({ ...prevState, ...data }))
    setStage('contract')
  }

  return (
    <div className={styles.section}>
      <Headline type="H3">General information</Headline>

      <Form
        onSubmit={handleNext}
        render={({ handleSubmit, pristine, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              {form.map(
                (
                  { name, label, placeholder, type, options, validate, grow },
                  i
                ) => (
                  <Field key={i} name={name} validate={validate}>
                    {({ input, meta }) => {
                      switch (type) {
                        case 'dropdown':
                          return (
                            <Dropdown
                              {...input}
                              label={label}
                              placeholder={placeholder}
                              options={options}
                              onClick={(item) => input.onChange(item.value)}
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
                type="submit"
                disabled={pristine || invalid}
                color="secondary"
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

export default PersonalSection
