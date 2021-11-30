import { useEffect, useState } from 'react'
import { Field } from 'react-final-form'
import {
  Glyph,
  Headline,
  Icon,
  Paragraph,
} from '@liquid-design/liquid-design-react'
import { Table, FormLayout, Image } from 'base/ui'
import { TextField, Dropdown } from 'base/form'
import { DeleteModal, EmployeesModal } from 'base/ui/modals'
import modalsHandler from 'helpers/modalsHandler'
import tablesColumns from 'helpers/tablesColumns'
import { useToggle } from 'helpers/hooks'
import validators from 'helpers/validator'
import { companyTeamsReq } from 'queries/companies'
import { usersReq } from 'queries/users'
import { createTeamReq, updateTeamReq, deleteTeamReq } from 'queries/teams'
import styles from './index.module.scss'

const defaultFields = {
  name: null,
  manager_id: null,
  members_ids: [],
}

const TeamManagement = () => {
  const [state, setState] = useState(defaultFields)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState()
  const [teamsData, setTeamsData] = useState({ result: [] })
  const [membersData, setMembersData] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [members, setMembers] = useState([])
  const [managers, setManagers] = useState([])
  const [selectedManager, setSelectedManager] = useState()
  const [employees, setEmployees] = useState()
  const [employeesModal, setEmployeesModal] = useState(false)
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const updateUsers = () => {
    usersReq()
      .then((data) => {
        setMembers(
          data.result
            .filter((member) => member.role !== 'manager' && !member.team)
            .map((member) => ({
              ...member,
              name: `${member.first_name || ''} ${member.last_name || ''}`,
            }))
        )

        setManagers(
          data.result
            .filter((member) => member.role === 'manager')
            .map((member) => ({
              ...member,
              name: `${member.first_name || ''} ${member.last_name || ''}`,
              disabled: !!member.team,
            }))
        )
      })
      .catch(() => {})
  }

  const handleDelete = (item, type) => {
    if (item) {
      setDeleteItem({ item, type })
      setDeleteModal(true)
    } else if (deleteItem.type === 'team')
      deleteTeamReq(deleteItem.item.id)
        .then(() =>
          setTeamsData((prevState) => {
            const prevData = [...prevState.result]

            const index = prevData.findIndex(
              (prevItem) => prevItem.id === deleteItem.item.id
            )
            prevData.splice(index, 1)

            return { ...prevState, result: prevData }
          })
        )
        .catch(() => {})
    else if (deleteItem.type === 'member') {
      if (deleteItem.item.teams || deleteItem.item.team) {
        const memberIndex = state.members_ids.findIndex(
          (member) => member === deleteItem.item.id
        )

        const ids = [...state.members_ids]
        ids.splice(memberIndex, 1)

        updateTeamReq({
          id: state.id,
          body: {
            name: state.name,
            manager_id: state.manager_id,
            members_ids: ids,
          },
        })
          .then((data) => {
            setTeamsData((prevState) => {
              const prev = [...prevState.result]

              const index = prev.findIndex((team) => team.id === data.id)
              // eslint-disable-next-line no-use-before-define
              prev[index] = { ...data, members: data.members || [], actions }

              return { ...prevState, result: prev }
            })

            setState((prevState) => ({ ...prevState, members_ids: ids }))

            updateUsers()

            setMembersData(
              (data.members || []).map((member) => ({
                ...member,
                team: { name: state.name },
              }))
            )

            setDeleteItem({})
          })
          .catch(() => {})
        setDeleteModal(false)
      }
    }
  }

  const handleEmployeesModal = (item) => {
    setEmployees({ name: item.name, items: item.members || [] })
    setEmployeesModal(true)
  }

  const handleTeamEdit = (item) => {
    setState({
      ...item,
      name: item.name,
      manager_id: item.manager.id,
      members_ids: item.members.map((member) => member.id),
    })

    setSelectedManager(item.manager)

    setMembersData(
      item.members.map((member) => ({
        ...member,
        teams: [item],
      }))
    )
  }

  const actions = [
    {
      iconName: 'bin',
      iconColor: '#e61e50',
      onClick: (item) => handleDelete(item, 'team'),
    },
    { iconName: 'people', iconColor: '#F3BE2F', onClick: handleEmployeesModal },
    { iconName: 'pencil', iconColor: '#0D6C42', onClick: handleTeamEdit },
  ]

  const handleConfirm = (fields) => {
    toggleLoading()
    const body = {
      ...fields,
      members_ids: [
        ...state.members_ids,
        ...selectedMembers.map((member) => member.id),
      ],
    }

    ;(state.id ? updateTeamReq({ id: state.id, body }) : createTeamReq(body))
      .then((data) =>
        setTeamsData((prevState) => {
          const prev = [...prevState.result]

          if (!state.id) prev.push({ ...data, actions })
          else {
            const index = prev.findIndex((item) => item.id === state.id)
            prev[index] = { ...data, actions }
          }
          setState(defaultFields)
          setMembersData([])
          setSelectedMembers([])
          setSelectedManager()
          updateUsers()
          modalsHandler({
            message: 'Changes have been saved successfully',
            isOpen: true,
          })
          toggleLoading()
          return { ...prevState, result: prev }
        })
      )
      .catch(() => {})
  }

  const handleCancel = () => {
    setState({ name: '', manager_id: '', members_ids: [] })
    setMembersData([])
    setSelectedMembers([])
    setSelectedManager()
  }

  const handleSelectMembers = (items) => setSelectedMembers([...items])

  useEffect(() => {
    updateUsers()

    companyTeamsReq()
      .then(
        (data) =>
          console.log(data) ||
          setTeamsData({
            ...data,
            result: data.result.map((item) => ({ ...item, actions })),
          })
      )
      .catch(() => {})
  }, [])

  return (
    <main className={styles.teamManagement}>
      <FormLayout
        className={styles.form}
        title="Create a Team"
        okTitle="Confirm"
        okOnClick={handleConfirm}
        cancelTitle="Cancel"
        cancelOnClick={handleCancel}
        isLoading={isLoading}
      >
        <div className={styles.inputs}>
          <Field
            name="name"
            validate={validators.required}
            defaultValue={state.name}
          >
            {({ input, meta }) => (
              <TextField
                label="Team Name"
                placeholder="Enter team name"
                error={meta.modified && meta.error}
                {...input}
              />
            )}
          </Field>

          <Field
            name="manager_id"
            validate={validators.required}
            defaultValue={state.manager_id}
          >
            {({ input, meta }) => (
              <Dropdown
                label=" "
                placeholder="Select Team Manager"
                onClick={(item) => {
                  input.onChange(item.id)
                  setSelectedManager(item)
                }}
                defaultItem={{ value: state.manager_id, key: 'id' }}
                options={managers}
                error={meta.modified && meta.error}
              />
            )}
          </Field>

          <Dropdown
            label=" "
            placeholder="Add Member"
            options={members}
            selectable
            selectedItems={selectedMembers}
            setSelectedItems={setSelectedMembers}
            onSelect={handleSelectMembers}
          />
        </div>

        <div className={styles.members}>
          <div className={styles.header}>
            <Icon className={styles.icon} size={24} name="people" isFilled />
            <Headline type="H3">Team members</Headline>
          </div>

          <div className={styles.items}>
            <div className={styles.row}>
              {selectedManager && (
                <div className={`${styles.item} ${styles.manager}`}>
                  <Image
                    src={
                      selectedManager.avatar_url || '/images/blank_profile.jpg'
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                    borderRadius="100%"
                  />

                  <Paragraph>{`${selectedManager.first_name} ${selectedManager.last_name}`}</Paragraph>

                  <button type="button">
                    <Glyph size={18} name="close" />
                  </button>
                </div>
              )}
            </div>

            {[...membersData, ...selectedMembers].map((member) => (
              <div key={member.id} className={styles.item}>
                <Image
                  src={member.avatar_url || '/images/blank_profile.jpg'}
                  alt="avatar"
                  width={40}
                  height={40}
                  borderRadius="100%"
                />

                <Paragraph>{`${member.first_name} ${member.last_name}`}</Paragraph>

                <button
                  type="button"
                  onClick={() => handleDelete(member, 'member')}
                >
                  <Glyph size={18} name="close" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </FormLayout>

      <Table
        title="Teams"
        columns={tablesColumns.teams}
        rows={teamsData.result}
        size="large"
      />

      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this?"
      />

      <EmployeesModal
        open={employeesModal}
        setOpen={setEmployeesModal}
        data={employees}
      />
    </main>
  )
}

export default TeamManagement
