/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { authStore, worklogStore, personnelStore } from 'stores'
import { Icon } from '@liquid-design/liquid-design-react'
import { Card, Table } from 'base/ui'
import { ReactComponent as OvertimeIcon } from 'assets/icons/overtime.svg'
import { ReactComponent as AbsenceIcon } from 'assets/icons/absence.svg'
import filteringHandler from 'helpers/filteringHandler'
import tablesColumns from 'helpers/tablesColumns'
import PermissionHandler from 'helpers/permissionHandler'
import { secondsToTime } from 'helpers/datetime'
import rowsPerPage from 'helpers/tablesRowsCount'
import { worklogsDashboardReq, worklogsReq } from 'queries/worklogs'
import styles from './index.module.scss'

const currentMonth = new Date().toLocaleDateString('default', { month: 'long' })

const { worklog: worklogTablesRows } = rowsPerPage

const Worklog = observer(() => {
  const { id: userId } = authStore.userData
  const { personnels } = personnelStore
  const [dashboard, setDashboard] = useState({})
  const [worklogData, setWorklogData] = useState({ total: 0, result: [] })
  const [worklogFilter, setWorklogFilter] = useState({})

  const handleWorklogFilter = (key, value) =>
    setWorklogFilter((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    if (userId) {
      worklogsDashboardReq({ user_id: userId })
        .then((data) => setDashboard(data))
        .catch(() => {})

      worklogsReq(
        { limit: worklogTablesRows.worklogs },
        { validRoles: ['admin', 'manager'] }
      )
        .then((data) => setWorklogData(data))
        .catch(() => {})
    }
  }, [userId])

  return (
    <main className={styles.worklog}>
      <div className={styles.infos}>
        <Card
          icon={<Icon size={25} name="finance" isFilled />}
          title="Work log"
          subTitle={
            dashboard.worklog ? secondsToTime(dashboard.worklog) : '0h, 00'
          }
          description={`${currentMonth} period`}
        />

        <Card
          icon={<AbsenceIcon />}
          title="Absence"
          subTitle={
            dashboard.absence ? secondsToTime(dashboard.absence) : '0h, 00'
          }
          description={`${currentMonth} period`}
        />

        <Card
          icon={<OvertimeIcon />}
          title="Overtime"
          subTitle={
            dashboard.overtime ? secondsToTime(dashboard.overtime) : '0h, 00'
          }
          description={`${currentMonth} period`}
        />
      </div>

      <PermissionHandler view={['admin', 'manager', 'employee']}>
        <Table
          title="Work log"
          toolbar={{
            tableType: 'teamWorkLog',
            personnelOptions: personnels,
            personnelOnClick: ({ id }) => {
              handleWorklogFilter('user_id', id)
              filteringHandler({
                query: worklogsReq,
                params: {
                  ...worklogFilter,
                  user_id: id,
                  limit: worklogTablesRows.worklogs,
                },
                stateHandler: setWorklogData,
                limit: worklogTablesRows.worklogs,
              })
            },
            onStartDate: (date) => {
              handleWorklogFilter('from', date)
              filteringHandler({
                query: worklogsReq,
                params: {
                  ...worklogFilter,
                  from: date,
                  limit: worklogTablesRows.worklogs,
                },
                stateHandler: setWorklogData,
              })
            },
            onEndDate: (date) => {
              handleWorklogFilter('to', date)
              filteringHandler({
                query: worklogsReq,
                params: {
                  ...worklogFilter,
                  to: date,
                  limit: worklogTablesRows.worklogs,
                },
                stateHandler: setWorklogData,
              })
            },
          }}
          columns={tablesColumns.worklogs}
          rows={worklogData.result}
          size="large"
          pages={worklogData.total}
          withPagination
          rowsPerPage={worklogTablesRows.worklogs}
          filterParams={worklogFilter}
          queryFunction={worklogsReq}
          stateHandler={setWorklogData}
        />
      </PermissionHandler>
    </main>
  )
})

export default Worklog
