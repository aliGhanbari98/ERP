import { Headline, Icon } from '@liquid-design/liquid-design-react'
import { Modal } from 'base/ui'
import strings from 'helpers/strings'
import styles from './index.module.scss'

const EmployeesModal = ({ open, setOpen, data }) => {
  const Label = () => (
    <div className={styles.label}>
      <Icon size={28} name="people" isFilled />

      <Headline type="H4">{`${data && data.name} employees`}</Headline>
    </div>
  )

  return (
    <Modal
      overlayClassName={styles.employees}
      isOpen={open}
      onClose={() => setOpen(false)}
      label={<Label />}
    >
      {data && data.items.length > 0 ? (
        data.items.map((member) => (
          <div key={member.id} className={styles.item}>
            <Headline type="H5">{`${member.first_name} ${member.last_name}`}</Headline>

            <Headline type="H5">{strings.roles[member.role]}</Headline>

            <Headline type="H5">{strings.genders[member.gender]}</Headline>

            <Headline type="H5">
              {member.contracts &&
                member.contracts[member.contracts.length - 1].position}
            </Headline>
          </div>
        ))
      ) : (
        <Headline type="H6">No Employees</Headline>
      )}
    </Modal>
  )
}

export default EmployeesModal
