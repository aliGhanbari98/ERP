import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Icon } from '@liquid-design/liquid-design-react'
import { authStore, personnelStore } from 'stores'
import { Card, Table } from 'base/ui'
import CardboardTable from 'base/card_board'
import { Button, Dropdown } from 'base/form'
import PermissionHandler from 'helpers/permissionHandler'
import filteringHandler from 'helpers/filteringHandler'
import tablesColumns from 'helpers/tablesColumns'
import inputsOptions from 'helpers/InputsOptions'
import rowsPerPage from 'helpers/tablesRowsCount'
import { requestsDashboardReq, requestsReq } from 'queries/requests'
import { teamMembersReq } from 'queries/teams'
import { myRequestsDashboardReq, myRequestsReq } from 'queries/profile'
import styles from './index.module.scss'

const tableDetailsPermission = {
  title: {
    admin: 'List of Requests',
    manager: 'List of Team memeber Requests',
    employee: 'List of my requests',
  },
  headerAction: {
    employee: <Button color="secondary">Add Request</Button>,
  },
  columns: {
    employee: tablesColumns.myRequests,
  },
}

const { requests: requestsTablesPages } = rowsPerPage

const Requests = observer(() => {
  const {
    role,
    first_name: firstName,
    last_name: lastName,
  } = authStore.userData
  const { personnels } = personnelStore

  const [listOfRequests, setListOfRequests] = useState({ total: 0, data: [] })
  const [requestStats, setRequestStats] = useState({})
  const [requestsFilter, setRequestsFilter] = useState({})

  const handleRequestsFilter = (key, value) =>
    setRequestsFilter((prevState) => ({ ...prevState, [key]: value }))

  const formatters = {
    myRequests: (data) => ({
      ...data,
      result: data.result.map((item) => ({
        ...item,
        first_name: item.first_name || firstName,
        last_name: item.last_name || lastName,
      })),
    }),
  }

  useEffect(() => {
    ;(role === 'employee' ? myRequestsDashboardReq() : requestsDashboardReq())
      .then((data) => setRequestStats(data))
      .catch(() => {})
    ;(role === 'employee'
      ? myRequestsReq()
      : requestsReq({ limit: requestsTablesPages.listOfRequests })
    )
      .then((data) => setListOfRequests(formatters.myRequests(data)))
      .catch(() => {})
  }, [])

  const RequestsToolbar = {
    tableType: 'requests',
    placeHolder:
      role !== 'employee' ? 'Request type' : `${firstName} ${lastName}`,
    options: inputsOptions.dropdown.requestType,
    dropDown: {
      disabled: role === 'employee',
      value: requestsFilter.dropdown,
      onClick: ({ value }) => {
        handleRequestsFilter('request_types', value)
        filteringHandler({
          query: requestsReq,
          params: {
            request_types: value,
            limit: requestsTablesPages.listOfRequests,
          },
          stateHandler: setListOfRequests,
        })
      },
    },
    onStartDate: (date) => {
      handleRequestsFilter('from', date)
      filteringHandler({
        query: role !== 'employee' ? requestsReq : myRequestsReq,
        params: {
          ...requestsFilter,
          from: date,
          to: requestsFilter.to,
          limit: requestsTablesPages.listOfRequests,
        },
        dataFormatter: formatters.myRequests,
        stateHandler: setListOfRequests,
      })
    },
    onEndDate: (date) => {
      handleRequestsFilter('to', date)
      filteringHandler({
        query: role !== 'employee' ? requestsReq : myRequestsReq,
        params: {
          ...requestsFilter,
          from: requestsFilter.from,
          to: date,
          limit: requestsTablesPages.listOfRequests,
        },
        dataFormatter: formatters.myRequests,
        stateHandler: setListOfRequests,
      })
    },
  }

  return (
    <main className={styles.requests}>
      <div className={styles.infos}>
        <Card
          icon={<Icon size={25} name="document" color="#a5cd50" isFilled />}
          title="Approved Requests"
          subTitle={requestStats.total_approved || 0}
          description="All periods"
        />
        <Card
          icon={<Icon size={25} name="document" color="#ffc832" isFilled />}
          title="Pending Requests"
          subTitle={requestStats.total_pending || 0}
          description="This month"
        />
        <Card
          icon={<Icon size={25} name="document" color="#e61e50" isFilled />}
          title="Denied Requests"
          subTitle={requestStats.total_rejected || 0}
          description="This month"
        />
      </div>

      <PermissionHandler view={['admin']}>
        <CardboardTable />
      </PermissionHandler>

      {/* This table is being shared between all roles  */}
      <Table
        title={tableDetailsPermission.title[role]}
        headerAction={
          tableDetailsPermission.headerAction[role] || (
            <Dropdown
              value={requestsFilter.headerDropDown}
              onClick={({ id }) => {
                handleRequestsFilter('user_id', id)
                filteringHandler({
                  query: requestsReq,
                  params: {
                    ...requestsFilter,
                    user_id: id,
                    status: 'pending',
                    limit: requestsTablesPages.listOfRequests,
                  },
                  stateHandler: setListOfRequests,
                })
              }}
              placeholder="All personnel"
              defaultItem
              options={personnels}
            />
          )
        }
        toolbar={RequestsToolbar}
        columns={
          tableDetailsPermission.columns[role] || tablesColumns.otherRequests
        }
        rows={listOfRequests.result}
        size="large"
        withPagination
        rowsPerPage={requestsTablesPages.listOfRequests}
        pages={listOfRequests.total}
        dataFormatter={formatters.myRequests}
        queryFunction={role !== 'employee' ? requestsReq : myRequestsReq}
        filterParams={requestsFilter}
        stateHandler={setListOfRequests}
      />
    </main>
  )
})

export default Requests
