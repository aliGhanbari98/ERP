import { useState } from 'react'
import { navigate } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { authStore } from 'stores'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button, Checkbox, TextField } from 'base/form'
import { registerReq } from 'queries/user'
import { useToggle } from 'helpers/hooks'
// import { Lang, lang } from 'helpers/language'
import styles from './index.module.scss'

const Register = observer(() => {
  const [fields, setFields] = useState({
    companyName: '',
    companyRegNum: '',
    companyPhone: '',
    ceoName: '',
    ceoId: '',
    ceoPhone: '',
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const handleChange = (value, key) => {
    setFields((prevState) => ({ ...prevState, [key]: value }))
  }

  const handleRegister = () => {
    toggleLoading()
    const body = {
      mobile_number: authStore.phone,
      phone_number: fields.companyPhone,
      name: fields.companyName,
      total_employees: 0,
      head_quarter_address: '',
      registration_number: fields.companyRegNum,
      ceo: {
        phone_number: fields.ceoPhone,
        mobile_number: fields.ceoPhone,
        first_name: fields.ceoName,
        last_name: '',
        national_code: fields.ceoId,
        auto_confirmation: true,
      },
    }
    registerReq(body)
      .then((data) => {
        toggleLoading()
        authStore.userData = data
        navigate('/')
      })
      .catch(() => {
        // TODO: Handle errors
      })
  }

  return (
    <main className={styles.registerPage}>
      <div className={styles.info}>
        <Headline className={styles.brand} type="XBH3">
          atency
        </Headline>
        <Headline className={styles.desc} type="XH5">
          We are glad you are here.
        </Headline>

        <Headline className={styles.desc} type="XH5">
          Building a company helps you to control your business ethnically.
        </Headline>
      </div>

      <div className={styles.card}>
        <Headline type="XH5">Request for registration</Headline>

        <div className={styles.inputs}>
          <TextField
            value={fields.companyName}
            onChange={(value) => handleChange(value, 'companyName')}
            label="Company name"
            placeholder="Enter your company name"
          />

          <TextField
            value={fields.ceoName}
            onChange={(value) => handleChange(value, 'ceoName')}
            label="CEO full name"
            placeholder="Enter CEO full name"
          />

          <TextField
            value={fields.companyRegNum}
            onChange={(value) => handleChange(value, 'companyRegNum')}
            label="Company registration number"
            placeholder="Enter registration number"
          />

          <TextField
            value={fields.ceoId}
            onChange={(value) => handleChange(value, 'ceoId')}
            label="CEO ID"
            placeholder="Enter CEO ID number"
          />

          <TextField
            value={fields.companyPhone}
            onChange={(value) => handleChange(value, 'companyPhone')}
            label="Company phone number"
            placeholder="Enter company phone number"
          />

          <TextField
            value={fields.ceoPhone}
            onChange={(value) => handleChange(value, 'ceoPhone')}
            label="CEO phone number"
            placeholder="Enter CEO phone number"
          />
        </div>

        <div className={styles.footer}>
          <Checkbox
            isChecked={acceptTerms}
            onChange={setAcceptTerms}
            label={
              <div className={styles.checkboxLabel}>
                I accept the
                <button type="button">Terms & Conditions</button>
              </div>
            }
          />

          <Button
            color="secondary"
            size="big"
            disabled={!acceptTerms}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </main>
  )
})

export default Register
