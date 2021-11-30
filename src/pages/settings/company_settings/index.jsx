import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Headline } from '@liquid-design/liquid-design-react'
import { TextField, RadioButton, Dropdown } from 'base/form'
import { FormLayout } from 'base/ui'
import { updateCompanyReq } from 'queries/companies'
import { useToggle } from 'helpers/hooks'
import { profileReq } from 'queries/profile'
import inputOptions from 'helpers/InputsOptions'
import { authStore } from 'stores'
import styles from './index.module.scss'

const contractCOOptions = [
  {
    id: 1,
    name: 'Option 1',
  },
]

const UAECalendarOptions = [
  {
    id: 1,
    name: 'Option1',
  },
]

const CompanySettings = observer(() => {
  const [fields, setFields] = useState({
    mobile_number: '',
    phone_number: '',
    name: '',
    total_employees: 0,
    head_quarter_address: '',
    registration_number: '',
    ceo: {
      mobile_number: '',
      phone_number: '',
      first_name: '',
      last_name: '',
      national_code: '',
    },
    settings: {
      auto_confirmation: false,
      calendar: '',
    },
    contractCO: '',
    UAECalendar: '',
  })
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  useEffect(() => {
    profileReq()
      .then((data) => {
        authStore.userData = data
        setFields((prevState) => ({ ...prevState, ...data.company }))
      })
      .catch(() => {})
  }, [])

  const handleChange = (value, key, subKey) => {
    setFields((prevState) => {
      const prev = prevState

      if (!subKey) prev[key] = value
      else prev[key][subKey] = value

      return { ...prevState }
    })
  }

  const handleCEOChange = (value, key) => {
    setFields((prevState) => ({
      ...prevState,
      ceo: { ...prevState.ceo, [key]: value },
    }))
  }

  const handleSave = () => {
    toggleLoading()
    updateCompanyReq(fields)
      .then(({ result }) => {
        toggleLoading()
        authStore.userData.company = result
      })
      .catch(() => {})
  }

  return (
    <main className={styles.companySettings}>
      <FormLayout
        title="Company Settings"
        okTitle="Save"
        isLoading={isLoading}
        okOnClick={handleSave}
      >
        <section className={styles.coInformation}>
          <Headline type="H3">Company information</Headline>

          <div className={styles.inputs}>
            <TextField
              value={fields.name}
              onChange={(value) => handleChange(value, 'name')}
              label="Company name"
              placeholder="Calistu"
            />

            <TextField
              value={fields.registration_number}
              onChange={(value) => handleChange(value, 'registration_number')}
              label="Company registration number"
              placeholder="123456789"
            />

            <TextField
              value={fields.phone_number}
              onChange={(value) => handleChange(value, 'phone_number')}
              label="Telephone number"
              placeholder="02123456789"
            />

            <TextField
              value={fields.mobile_number}
              onChange={(value) => handleChange(value, 'mobile_number')}
              label="Phone number"
              placeholder="09123456789"
            />

            <TextField
              value={fields.head_quarter_address}
              onChange={(value) => handleChange(value, 'head_quarter_address')}
              label="Company Address"
              placeholder="Tehran, Mirdamad st. Ros tower"
            />
          </div>
        </section>

        <section className={styles.ceoInformation}>
          <Headline type="H3">CEO information</Headline>

          <div className={styles.inputs}>
            <TextField
              value={fields.ceo.first_name}
              onChange={(value) => handleCEOChange(value, 'first_name')}
              label="Name"
              placeholder="Mohammad"
            />

            <TextField
              value={fields.ceo.last_name}
              onChange={(value) => handleCEOChange(value, 'last_name')}
              label="Last name"
              placeholder="Dastafkan"
            />

            <TextField
              value={fields.ceo.phone_number}
              onChange={(value) => handleCEOChange(value, 'phone_number')}
              label="Telephone number"
              placeholder="02123456789"
            />

            <TextField
              value={fields.ceo.mobile_number}
              onChange={(value) => handleCEOChange(value, 'mobile_number')}
              label="Phone number"
              placeholder="09123456789"
            />

            <TextField
              value={fields.ceo.national_code}
              onChange={(value) => handleCEOChange(value, 'national_code')}
              label="ID number*"
              placeholder="Enter ID number"
            />
          </div>
        </section>

        <section className={styles.traffic}>
          <Headline type="H3">Traffic registration method</Headline>

          <div className={styles.inputs}>
            <RadioButton
              isSelected={!fields.settings.auto_confirmation}
              onClick={() =>
                handleChange(false, 'settings', 'auto_confirmation')
              }
              label="Approved by administrator"
              color="secondary"
            />

            <RadioButton
              isSelected={fields.settings.auto_confirmation}
              onClick={() =>
                handleChange(true, 'settings', 'auto_confirmation')
              }
              label="Automatic confirmation"
              color="secondary"
            />
          </div>
        </section>

        <section className={styles.contract}>
          <Headline type="H3">Default contract setting</Headline>
          <div className={styles.inputs}>
            <Dropdown
              options={contractCOOptions}
              onClick={(value) => handleChange(value, 'contractCO')}
              placeholder="Type of calculate overtime"
              color="secondary"
            />

            <Dropdown
              options={inputOptions.dropdown.calendars}
              defaultItem={{ value: fields.settings.calendar, key: 'value' }}
              onClick={({ value }) =>
                handleChange(value, 'settings', 'calendar')
              }
              placeholder="Calendar"
              color="secondary"
            />

            <Dropdown
              options={UAECalendarOptions}
              onClick={(value) => handleChange(value, 'UAECalendar')}
              placeholder="UAE Calendar"
              color="secondary"
            />
          </div>
        </section>
      </FormLayout>
    </main>
  )
})

export default CompanySettings
