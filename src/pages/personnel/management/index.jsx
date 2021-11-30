import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Navigator } from 'base/ui'
import { authStore } from 'stores'
import { useToggle } from 'helpers/hooks'
import modalsHandler from 'helpers/modalsHandler'
import { updatePasswordReq } from 'queries/user'
import { getUserReq, resetPasswordReq, updateUserReq } from 'queries/users'
import { profileReq, updateProfileReq } from 'queries/profile'
import {
  GeneralSection,
  InformationsSection,
  PasswordSection,
} from './sections'
import styles from './index.module.scss'

const PersonnelMangement = observer(({ userId }) => {
  const { userData } = authStore
  const [user, setUser] = useState({})
  const { value: generalLoading, toggle: togglegeneralLoading } = useToggle(
    false
  )
  const {
    value: informationLoading,
    toggle: toggleInformationLoading,
  } = useToggle(false)
  const { value: passwordLoading, toggle: togglePasswordLoading } = useToggle(
    false
  )

  useEffect(() => {
    if (userId && userData.id === userId)
      profileReq()
        .then((data) => setUser(data))
        .catch(() => {})
    else
      getUserReq(userId)
        .then((data) => setUser(data))
        .catch(() => {})
  }, [userId])

  const handleConfirm = (data, section) => {
    if (userData.id === userId) {
      if (section === 'general') togglegeneralLoading()
      else toggleInformationLoading()

      updateProfileReq({ ...data })
        .then((res) => {
          setUser(res)
          authStore.userData = res
          if (section === 'general') togglegeneralLoading()
          else toggleInformationLoading()
          modalsHandler({
            message: 'Changes have been saved successfully',
            isOpen: true,
          })
        })
        .catch(() => {})
    } else {
      updateUserReq({
        id: user.id,
        body: {
          ...data,
        },
      })
        .then((res) => {
          setUser({ id: user.id, ...res })
          modalsHandler({
            message: 'Changes have been saved successfully',
            isOpen: true,
          })
        })
        .catch(() => {})
    }
  }

  const handlePasswordConfirm = (fields) => {
    togglePasswordLoading()
    if (userData.role !== 'admin')
      updatePasswordReq({
        old_password: fields.old_password,
        new_password: fields.password,
      })
        .then(() => {
          togglePasswordLoading()
          modalsHandler({
            message: 'Changes have been saved successfully',
            isOpen: true,
          })
        })
        .catch(() => {})
    else {
      resetPasswordReq({
        id: user.id,
        body: { new_password: fields.password },
      })
        .then(() => {
          togglePasswordLoading()
        })
        .catch(() => {})
    }
  }

  return (
    <main className={styles.personnelManagement}>
      <Navigator
        prevLabel="Personnel"
        currentLabel={`${user.first_name || ''} ${user.last_name || ''}`}
        path={userData.role === 'admin' ? '/dashboard/personnel' : ''}
      />

      <GeneralSection
        user={user}
        isLoading={generalLoading}
        onConfirm={handleConfirm}
      />

      <InformationsSection
        user={user}
        isLoading={informationLoading}
        onConfirm={handleConfirm}
      />

      <PasswordSection
        user={user}
        isLoading={passwordLoading}
        onConfirm={handlePasswordConfirm}
      />
    </main>
  )
})

export default PersonnelMangement
