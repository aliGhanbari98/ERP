import { useState } from 'react'
import { navigate } from '@reach/router'
import { Headline } from '@liquid-design/liquid-design-react'
import { Button, Password } from 'base/form'
import { useToggle } from 'helpers/hooks'
import { Lang, lang } from 'helpers/language'
import { updatePasswordReq } from 'queries/user'
import styles from './index.module.scss'

const ChangePassword = ({ limited, onCancelClick }) => {
  const [errors, setErrors] = useState({ phone: null, code: null })
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const validator = () =>
    (limited ? false : !oldPassword) ||
    !newPassword ||
    !repeatPassword ||
    newPassword !== repeatPassword

  const onSaveClick = () => {
    toggleLoading()
    const query = limited
      ? updatePasswordReq({
          new_password: newPassword,
        })
      : updatePasswordReq({
          old_password: oldPassword,
          new_password: newPassword,
        })

    query
      .then((data) => {
        toggleLoading()
        navigate('/')
      })
      .catch(() => {})
  }

  return (
    <div className={styles.changePassword}>
      <Headline type="H2">Change Password</Headline>

      {!limited && (
        <Password
          value={oldPassword}
          onChange={setOldPassword}
          label="Old password"
          placeholder="Enter your new password"
          error={errors.phone}
        />
      )}
      <Password
        value={newPassword}
        onChange={setNewPassword}
        label="New password"
        placeholder="Enter your old password"
        error={errors.phone}
      />
      <Password
        value={repeatPassword}
        onChange={setRepeatPassword}
        label="Repeat password"
        placeholder="Repeat your password"
        error={errors.phone}
      />

      <div className={styles.buttons}>
        <Button
          color="secondary"
          appearance="secondary"
          onClick={onCancelClick}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          disabled={validator()}
          onClick={onSaveClick}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default ChangePassword
