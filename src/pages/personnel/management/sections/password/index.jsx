import { observer } from 'mobx-react-lite'
import { Field } from 'react-final-form'
import { Password } from 'base/form'
import { FormLayout } from 'base/ui'
import { authStore } from 'stores'
import validators from 'helpers/validator'
import styles from './index.module.scss'

const PasswordSection = observer(({ onConfirm, isLoading }) => {
  const { userData } = authStore

  return (
    <FormLayout
      className={styles.password}
      title="Change Password"
      okTitle="Save"
      okOnClick={onConfirm}
      cancelTitle="Cancel"
      isLoading={isLoading}
    >
      {userData.role !== 'admin' && (
        <Field name="old_password" validate={validators.required}>
          {({ input, meta }) => (
            <Password
              label="Old Password*"
              placeholder="Enter old password"
              error={meta.modified && meta.error}
              {...input}
            />
          )}
        </Field>
      )}

      <Field name="password" validate={validators.required}>
        {({ input, meta }) => (
          <Password
            label="New Password*"
            placeholder="Enter new password"
            error={meta.modified && meta.error}
            {...input}
          />
        )}
      </Field>

      <Field name="repeat_password" validate={validators.validatePassword}>
        {({ input, meta }) => (
          <Password
            label="Repeat Password*"
            placeholder="Enter new password"
            error={meta.modified && meta.error}
            {...input}
          />
        )}
      </Field>
    </FormLayout>
  )
})

export default PasswordSection
