import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { navigate } from '@reach/router'
import {
  Header as LiquidHeader,
  Headline,
} from '@liquid-design/liquid-design-react'
import { Image, Modal, ChangePassword } from 'base/ui'
import Menu from 'base/ui/menu'
import authStore from 'stores/AuthStore'
import styles from './index.module.scss'

const Header = observer(() => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    avatar_url: avatarUrl,
  } = authStore.userData || {}

  const menuItems = [
    {
      title: 'Profile',
      iconName: 'person',
      onClick: () => navigate(`/dashboard/personnel/${userId}`),
    },
    {
      title: 'Change password',
      iconName: 'keys',
      onClick: () => setModalIsOpen(true),
    },
  ]

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const Profile = () => (
    <Menu
      items={menuItems}
      footerButton={{ title: 'Logout', onClick: handleLogout }}
    >
      <button type="button" className={styles.profile}>
        <span>{`${firstName || ''} ${lastName || ''}`}</span>
        <Image
          src={avatarUrl || '/images/blank_profile.jpg'}
          alt="Profile"
          width={44}
          height={44}
          borderRadius="100%"
        />
      </button>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <ChangePassword onCancelClick={() => setModalIsOpen(false)} />
      </Modal>
    </Menu>
  )

  return (
    <LiquidHeader
      className={styles.header}
      logoComponent={
        <Headline type="H2" className={styles.logo}>
          Atency
        </Headline>
      }
      withText
      labelOne={<Profile />}
    />
  )
})

export default Header
