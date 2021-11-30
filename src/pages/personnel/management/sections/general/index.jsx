import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Field } from 'react-final-form'
import { Dropdown, TextField } from 'base/form'
import { FormLayout, Avatar } from 'base/ui'
import { authStore } from 'stores'
import { companyWorkplacesReq } from 'queries/companies'
import { deleteAvatarReq, uploadAvatarReq } from 'queries/profile'
import validators from 'helpers/validator'
import styles from './index.module.scss'

const GeneralSection = observer(({ user, onConfirm, onCancel, isLoading }) => {
  const { userData } = authStore
  const [workplaces, setWorkplaces] = useState([])
  const [selectedWorkplace, setSelectedWorkplace] = useState()

  useEffect(() => {
    setSelectedWorkplace(
      (user.workplaces || []).length > 0 && user.workplaces[0].id
    )
  }, [user])

  useEffect(() => {
    companyWorkplacesReq(null, { validRoles: ['admin'] })
      .then((data) => setWorkplaces(data.result))
      .catch(() => {})
  }, [])

  const handleAvatarChange = (image) => {
    const formData = new FormData()
    formData.append('avatar', image)

    uploadAvatarReq(formData)
      .then((data) => {
        authStore.userData.avatar_url = data.file_url
      })
      .catch(() => {})
  }

  const handleAvatarDelete = () => {
    deleteAvatarReq().catch(() => {})
  }

  const handleSubmit = (data) =>
    onConfirm({ ...data, workplaces_ids: [selectedWorkplace] }, 'general')

  return (
    <FormLayout
      className={styles.general}
      title="General information"
      okTitle="Save"
      okOnClick={handleSubmit}
      cancelTitle="Cancel"
      cancelOnClick={onCancel}
      isLoading={isLoading}
    >
      <Avatar
        user={user}
        onChange={handleAvatarChange}
        onDelete={handleAvatarDelete}
        disabled={user.id !== userData.id}
      />

      <div className={styles.fields}>
        <Field
          name="first_name"
          initialValue={user.first_name}
          validate={validators.required}
        >
          {({ input, meta }) => (
            <TextField
              label="Name*"
              disabled={userData.role !== 'admin'}
              error={meta.modified && meta.error}
              {...input}
            />
          )}
        </Field>

        <Field
          name="last_name"
          initialValue={user.last_name}
          validate={validators.required}
        >
          {({ input, meta }) => (
            <TextField
              label="Last name*"
              disabled={userData.role !== 'admin'}
              error={meta.modified && meta.error}
              {...input}
            />
          )}
        </Field>

        <Field name="workplaces_ids">
          {({ input, meta }) => (
            <Dropdown
              label=" "
              placeholder="Workplace"
              options={workplaces}
              onClick={(item) => {
                input.onChange([item.id])
                setSelectedWorkplace(item.id)
              }}
              defaultItem={{
                value: selectedWorkplace,
                key: 'id',
              }}
              disabled={userData.role !== 'admin'}
              error={meta.modified && meta.error}
              {...input}
            />
          )}
        </Field>
      </div>
    </FormLayout>
  )
})

export default GeneralSection
