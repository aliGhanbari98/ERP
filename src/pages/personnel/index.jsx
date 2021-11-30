import { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { Headline, StepProgressBar } from '@liquid-design/liquid-design-react'
import { Table } from 'base/ui'
import tablesColumns from 'helpers/tablesColumns'
import rowsPerPage from 'helpers/tablesRowsCount'
import { useToggle } from 'helpers/hooks'
import modalsHandler from 'helpers/modalsHandler'
import { usersReq, createUserReq } from 'queries/users'
import routes from './routes'
import styles from './index.module.scss'

const defaultFields = {
  mobile_number: '',
  first_name: '',
  last_name: '',
  gender: '',
  father_name: '',
  email: '',
  phone_number: '',
  employee_code: '',
  national_code: '',
  address: '',
  contracts: [
    {
      contract_term_id: '',
      salary: 0,
      work_hours_per_month: 0,
      start_datetime: '',
      end_datetime: '',
      work_start_datetime: '',
      work_end_datetime: '',
      contract_number: '',
      contract_type: 'full-time',
      position: '',
    },
  ],
  workplaces_ids: [],
  shift_id: '',
}

const { personnel: personnelTablesRows } = rowsPerPage

const stages = {
  personal: 0,
  contract: 1,
  company: 2,
}

const Personnel = observer(() => {
  const [fields, setFields] = useState(defaultFields)
  const [personnelsData, setPersonnelsData] = useState({ total: 0, result: [] })
  const [stage, setStage] = useState('personal')
  const { value: isLoading, toggle: toggleLoading } = useToggle(false)

  const handleEdit = (item) => {
    navigate(`/dashboard/personnel/${item.id}`)
  }

  const formatters = {
    personnel: (data) => ({
      ...data,
      result: data.result.map((item) => ({
        ...item,
        onEdit: () => handleEdit(item),
      })),
    }),
  }

  const getUsers = () =>
    usersReq({ limit: personnelTablesRows.personnel })
      .then((data) => setPersonnelsData(formatters.personnel(data)))
      .catch(() => {})

  const handleConfirm = (dataFields) => {
    toggleLoading()
    createUserReq(dataFields)
      .then(() => {
        toggleLoading()
        getUsers()
        modalsHandler({
          message: 'Changes have been saved successfully',
          isOpen: true,
        })
        setFields(defaultFields)
        setStage('personal')
      })
      .catch(() => {})
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <main className={styles.personnel}>
      <div className={styles.add}>
        <Headline type="H2">Add New Personnel</Headline>

        <div className={styles.progress}>
          <StepProgressBar
            current={stages[stage]}
            steps={[
              { name: 'Personal information' },
              { name: 'Contract' },
              { name: 'Company information' },
            ]}
          />
        </div>

        {routes.map(({ component: Component, name }) => {
          return (
            name === stage && (
              <Component
                key={name}
                user={{}}
                fields={fields}
                setFields={setFields}
                setStage={setStage}
                handleSave={handleConfirm}
                isLoading={isLoading}
              />
            )
          )
        })}
      </div>

      <Table
        className={styles.table}
        title="Personnel Management"
        columns={tablesColumns.personnel}
        rows={personnelsData.result}
        hasPhoto
        size="large"
        withPagination
        dataFormatter={formatters.personnel}
        rowsPerPage={personnelTablesRows.personnel}
        queryFunction={usersReq}
        stateHandler={setPersonnelsData}
        pages={personnelsData.total}
      />
    </main>
  )
})

export default Personnel
