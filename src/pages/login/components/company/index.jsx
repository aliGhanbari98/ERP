import { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { Glyph, Headline } from '@liquid-design/liquid-design-react'
import { Button } from 'base/form'
import authStore from 'stores/AuthStore'
import { Lang, lang } from 'helpers/language'
import { profileReq } from 'queries/profile'
import { useToggle } from 'helpers/hooks'
import { forgotPasswordReq, accessTokenReq } from 'queries/user'
import styles from './index.module.scss'

const Company = ({ forgot, handleUserData, userData = {} }) => {
  const [selectedCompany, setSelectedCompany] = useState('')
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)
  const { companies = [] } = userData

  const handleCompany = !forgot
    ? (companyId) => {
        toggleLoading()
        handleUserData(selectedCompany, 'selectedCompany')
        accessTokenReq({ company_id: companyId || selectedCompany.id })
          .then((data) => {
            localStorage.setItem('accessToken', data.access_token)
            localStorage.setItem('refreshToken', data.refresh_token)
            localStorage.setItem('loggedIn', true)
          })
          .then(() => profileReq())
          .then((res) => {
            toggleLoading()
            authStore.userData = res
            navigate('/dashboard')
          })
          .catch((err) => {
            // TODO: Handle errors
          })
      }
    : (companyId) => {
        toggleLoading()
        forgotPasswordReq({ company_id: companyId || selectedCompany.id }).then(
          (data) => {
            toggleLoading()

            localStorage.setItem('accessToken', data.access_token)
            navigate('/change-password')
          }
        )
      }

  useEffect(() => {
    if (companies.length === 1) {
      handleCompany(companies[0].id)
    }
  }, [])

  return (
    <div className={styles.company}>
      <Headline type="H2">Choose company</Headline>

      <div className={styles.companies}>
        <Headline type="H5">Please choose the company to login</Headline>

        {companies.map((company, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.item} ${
              selectedCompany && selectedCompany.name === company.name
                ? styles.selected
                : ''
            }`}
            onClick={() => setSelectedCompany(company)}
          >
            <Glyph className={styles.icon} size={22} name="placeholder" />
            <span>{company.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.button}>
        <Button
          color="secondary"
          disabled={!selectedCompany}
          onClick={() => handleCompany()}
          loading={isLoading}
        >
          Select
        </Button>
      </div>
    </div>
  )
}

export default Company
