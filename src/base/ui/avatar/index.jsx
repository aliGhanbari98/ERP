/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import { Icon } from '@liquid-design/liquid-design-react'
import { DeleteModal } from 'base/ui/modals'
import Image from 'base/ui/image'
import { authStore } from 'stores'
import styles from './index.module.scss'

const Avatar = ({ user, onChange, onDelete, disabled }) => {
  const [image, setImage] = useState()
  const [deleteModal, setDeleteModal] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0]

      setImage(URL.createObjectURL(imageFile))
      if (onChange instanceof Function) onChange(imageFile)
    }
  }

  const handleDelete = () => {
    if (onDelete instanceof Function) onDelete()
    setImage('/images/blank_profile.jpg')
    authStore.userData.avatar_url = '/images/blank_profile.jpg'
    setDeleteModal(false)
  }

  return (
    <div className={styles.avatar}>
      <Image
        className={styles.image}
        src={image || user.avatar_url || '/images/blank_profile.jpg'}
        alt="Avatar"
      />

      <div className={`${styles.actions} ${disabled ? styles.disabled : ''}`}>
        <button
          type="button"
          className={styles.delete}
          onClick={() => setDeleteModal(true)}
        >
          <Icon name="bin" size={20} isFilled />
        </button>

        <label className={styles.edit}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Icon name="pencil" size={20} isFilled />
        </label>
      </div>

      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        message="Are you sure you want to delete your avatar?"
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default Avatar
