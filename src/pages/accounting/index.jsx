// modules
import { useEffect, useState } from 'react'
import { Navigator, Table } from 'base/ui'
import { navigate } from '@reach/router'
// queries
import {
  mySalaryDetailsReq,
  myAccountingReq,
  mySalaryPerMonthReq,
} from 'queries/profile'
import { accountingByUserIdReq } from 'queries/users'
import {
  getUsersAccountingReq,
  getSalaryPerTeamReq,
  getSalaryPerMonthReq,
} from 'queries/accounting'
// helpers
import tablesColumns from 'helpers/tablesColumns'
import tablesRowsCount from 'helpers/tablesRowsCount'
import filteringHandler from 'helpers/filteringHandler'
import months from 'helpers/months'
// store
import { personnelStore, authStore } from 'stores'
// components
import AccountingCharts from './charts'
// styles
import styles from './index.module.scss'

const rowsPerPage = tablesRowsCount.accounting.salary

const pieOptionMap = [
  {
    key: 'total_attendance',
    name: 'Salary on total attendance',
    fill: '#0D6C42',
  },
  {
    key: 'overtime',
    name: 'Salary on regular overtime',
    fill: '#749038',
  },
  {
    key: 'weekend_overtime',
    name: 'Salary on weekend overtime',
    fill: '#95B948',
  },
  {
    key: 'holiday_overtime',
    name: 'Salary on holiday overtime',
    fill: '#A5CD50',
  },
  {
    key: 'mission',
    name: 'Salary on mission',
    fill: '#0E5F9E',
  },
  {
    key: 'absent',
    name: 'Deduction of salary for absence',
    fill: '#CF1B48',
  },
]

const rolesMap = {
  admin: { tableTitle: 'Personnel salary' },
  manager: { tableTitle: 'Team members salary' },
  employee: { tableTitle: 'Salary history' },
}

const monthExporter = (dateString) => {
  const month = dateString.substring(dateString.indexOf('-') + 1)
  const result = month.charAt(0) === '0' ? month.charAt(1) : month
  return parseInt(result, 10)
}

const formatters = {
  table: ({ result, total }) => ({
    total,
    data: result.map((item) => ({
      onDetailsClick: () => navigate(`accounting/${item.user_id}`),
      ...item,
    })),
  }),
  details: ({ result, total }) => ({
    total,
    data: result.map((item) => ({ ...item, month: months[item.month].name })),
  }),
  barChart: (result) =>
    result.map(({ team, salary }) => ({
      team,
      salary,
    })),
  pieChart: (result) =>
    pieOptionMap.map((item) => ({
      value: result[item.key],
      ...item,
    })),
  lineChart: (result) =>
    result.map(({ month, salary }) => ({
      name: months[monthExporter(month) - 1].name,
      salary,
    })),
}

const Accounting = ({ userId }) => {
  const { personnels } = personnelStore
  const {
    userData: {
      role,
      first_name: firstName,
      last_name: lastName,
      id: loggedInUserId,
    },
  } = authStore
  const [toolbarParams, setToolbarParams] = useState({})
  const [pieData, setPieData] = useState({
    data: [],
    selectedMonthSalary: 0,
  })
  const [lineData, setLineData] = useState([])
  const [barData, setBarData] = useState([])
  const [tableData, setTableData] = useState({})

  const handleToolbarParams = (key, value) =>
    setToolbarParams((prevState) => ({ ...prevState, [key]: value }))

  const isEmployee = userId || role === 'employee'

  const tableDynamicHandlers = {
    params: { limit: rowsPerPage },
    formatter: isEmployee ? formatters.details : formatters.table,
  }
  if (role === 'employee') {
    tableDynamicHandlers.query = myAccountingReq
  } else if (userId) {
    tableDynamicHandlers.query = accountingByUserIdReq
    tableDynamicHandlers.params = { limit: rowsPerPage, user_id: userId }
  } else tableDynamicHandlers.query = getUsersAccountingReq

  const tableToolbar = {
    tableType: !isEmployee ? 'accounting' : 'userAccounting',
    personnel: {
      options: personnels,
      onClick: ({ id }) => {
        handleToolbarParams('user_id', id)
        filteringHandler({
          query: getUsersAccountingReq,
          params: {
            user_id: id,
            limit: rowsPerPage,
          },
          stateHandler: setTableData,
          formatter: formatters.table,
        })
      },
    },
    months: {
      options: months,
      onClick: ({ from, to }) => {
        handleToolbarParams('from', from)
        handleToolbarParams('to', to)
        filteringHandler({
          query: tableDynamicHandlers.query,
          params: toolbarParams.user_id
            ? { user_id: toolbarParams.user_id, from, to, limit: rowsPerPage }
            : {
                ...tableDynamicHandlers.params,
                from,
                to,
              },
          stateHandler: setTableData,
          formatter: tableDynamicHandlers.formatter,
        })
      },
    },
  }

  const getPieData = ({
    from,
    to,
    value = new Date().getMonth().toLocaleString('en-US', { month: 'numeric' }),
    handleLineData,
  }) => {
    let query = null
    if (role === 'employee') query = mySalaryPerMonthReq()
    else if (userId) query = getSalaryPerMonthReq({ user_id: userId })
    else query = getSalaryPerMonthReq()

    query
      .then((data) => {
        if (handleLineData) setLineData(formatters.lineChart(data))
        const { salary } =
          data.find(({ month }) => month.toString() === value) || {}
        return {
          nextQuery: mySalaryDetailsReq({ from, to }),
          selectedMonthSalary: salary,
        }
      })
      .then(({ nextQuery, selectedMonthSalary }) =>
        nextQuery.then((data) =>
          setPieData({
            data: formatters.pieChart(data),
            selectedMonthSalary,
          })
        )
      )
  }

  const getBarData = ({ from, to }) => {
    getSalaryPerTeamReq({ from, to }).then((data) =>
      setBarData(formatters.barChart(data))
    )
  }

  useEffect(() => {
    Promise.all([
      tableDynamicHandlers
        .query(tableDynamicHandlers.params)
        .then((data) => setTableData(tableDynamicHandlers.formatter(data))),
      getSalaryPerTeamReq(null, {
        validRoles: ['admin'],
      }).then((data) => setBarData(formatters.barChart(data))),
      getPieData({ handleLineData: true }),
    ])
  }, [])

  return (
    <main className={styles.accounting}>
      {isEmployee && (
        <Navigator
          prevLabel="Accounting"
          currentLabel={`${firstName} ${lastName}`}
          path="/dashboard/accounting"
        />
      )}

      <AccountingCharts
        type={!isEmployee && role !== 'manager' ? 'admin' : 'employee'}
        months={months}
        pieData={pieData}
        filterData={!isEmployee && role !== 'manager' ? getBarData : getPieData}
        lineData={lineData}
        barData={barData}
      />

      <Table
        className={styles.table}
        title={rolesMap[role].tableTiel}
        toolbar={tableToolbar}
        rowsPerPage={rowsPerPage}
        rows={tableData.data}
        pages={tableData.total}
        withPagination
        filterParams={toolbarParams}
        queryFunction={getUsersAccountingReq}
        dataFormatter={formatters.table}
        columns={
          !isEmployee ? tablesColumns.accounting : tablesColumns.userAccounting
        }
      />
    </main>
  )
}

export default Accounting
