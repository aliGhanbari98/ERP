/* eslint-disable import/no-unresolved */ // TODO
import { useState, useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import { observer } from 'mobx-react-lite'
import {
  Headline,
  Glyph,
  Paragraph,
  Icon,
} from '@liquid-design/liquid-design-react'
import { authStore } from 'stores'
import { Card, Table } from 'base/ui'
import CardboardTable from 'base/card_board'
import filteringHandler from 'helpers/filteringHandler'
import PermissionHandler from 'helpers/permissionHandler'
import tablesColumns from 'helpers/tablesColumns'
import { AddRequestModal } from 'base/ui/modals'
import { ReactComponent as PrintIcon } from 'assets/icons/print.svg'
import { ReactComponent as OvertimeIcon } from 'assets/icons/overtime.svg'
import { ReactComponent as AbsenceIcon } from 'assets/icons/absence.svg'
import { secondsToTime } from 'helpers/datetime'
import rowsPerPage from 'helpers/tablesRowsCount'
import {
  absencesReq,
  attendeesReq,
  dashboardReq,
  progressReq,
  progressCompleteReq,
} from 'queries/dashboard'
import { requestsReq } from 'queries/requests'
import { myRequestsReq } from 'queries/profile'
import styles from './index.module.scss'

const Print = ({ onClick }) => {
  return (
    <button type="button" className={styles.printButton} onClick={onClick}>
      <PrintIcon />
    </button>
  )
}

const { dashboard: dashboardTablesPages } = rowsPerPage

const Dashboard = observer(() => {
  const {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    role,
  } = authStore.userData
  const [progress, setProgress] = useState({})
  const [dashboard, setDashboard] = useState({})
  const [absenceData, setAbsenceData] = useState({ total: 0, result: [] })
  const [attendeesData, setAttendeesData] = useState({ total: 0, result: [] })
  const [myRequestsState, setMyRequestsState] = useState({})
  const [myRequestsData, setMyRequestsData] = useState({ total: 0, result: [] })

  const [refToPrint, setRefToPrint] = useState()

  const handleMyRequestsState = (key, value) =>
    setMyRequestsState((prevState) => ({ ...prevState, [key]: value }))

  const attendeesRef = useRef()
  const absenceRef = useRef()

  const print = useReactToPrint({
    bodyClass: `${styles.printBody}`,
    content: () => refToPrint,
  })

  useEffect(() => {
    progressReq(null, { validRoles: ['admin'] })
      .then((data) => {
        let tempData = data
        const totalCompletes = Object.keys(data).reduce(
          (a, b) => (data[b] ? a + 1 : a + 0),
          0
        )
        if (totalCompletes === 4) {
          progressCompleteReq({ is_completed: true })
          tempData = { ...data, is_completed: true }
        }

        setProgress(tempData)
      })
      .catch(() => {})

    dashboardReq()
      .then((data) => setDashboard(data))
      .catch(() => {})

    attendeesReq(
      { limit: dashboardTablesPages.attendees },
      { validRoles: ['admin', 'manager'] }
    )
      .then((data) => setAttendeesData(data))
      .catch(() => {})

    absencesReq(
      { limit: dashboardTablesPages.absences },
      { validRoles: ['admin', 'manager'] }
    )
      .then((data) => setAbsenceData(data))
      .catch(() => {})

    requestsReq(
      { limit: dashboardTablesPages.myRequests },
      { validRoles: ['admin', 'manager'] }
    )
      .then(({ data, total }) => {
        setMyRequestsData({ total, data })
      })
      .catch(() => {})

    myRequestsReq(
      { limit: dashboardTablesPages.myRequests },
      { validRoles: ['employee'] }
    )
      .then(({ data, total }) =>
        setMyRequestsData({
          total,
          data: data.map((item) => ({
            ...item,
            first_name: firstName,
            last_name: lastName,
          })),
        })
      )
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (refToPrint) print()
  }, [refToPrint])

  return (
    <main className={styles.dashboard}>
      <PermissionHandler view={['admin']}>
        <Card className={styles.steps}>
          <Headline type="H2">Welcome to Atency</Headline>
          <Headline className={styles.subTitle} type="H6">
            To use the Atency system, complete the following steps.
          </Headline>

          <div className={styles.stepsWrapper}>
            <span className={styles.line} />

            <div className={progress.work_place ? styles.done : ''}>
              <span>
                <Glyph
                  size={25}
                  name={`progressBar${
                    progress.work_place ? 'CheckMark' : 'ComingUp'
                  }`}
                />
              </span>
              <Paragraph type="xs">Define the workplace</Paragraph>
            </div>

            <div className={progress.shift ? styles.done : ''}>
              <span>
                <Glyph
                  size={25}
                  name={`progressBar${
                    progress.shift ? 'CheckMark' : 'ComingUp'
                  }`}
                />
              </span>
              <Paragraph type="xs">Define the shift</Paragraph>
            </div>

            <div className={progress.company_info ? styles.done : ''}>
              <span>
                <Glyph
                  size={25}
                  name={`progressBar${
                    progress.company_info ? 'CheckMark' : 'ComingUp'
                  }`}
                />
              </span>
              <Paragraph type="xs">Complete company information</Paragraph>
            </div>

            <div className={progress.personnel ? styles.done : ''}>
              <span>
                <Glyph
                  size={25}
                  name={`progressBar${
                    progress.personnel ? 'CheckMark' : 'ComingUp'
                  }`}
                />
              </span>
              <Paragraph type="xs">Define personnel</Paragraph>
            </div>

            <div className={progress.is_completed ? styles.done : ''}>
              <span>
                <Glyph
                  size={25}
                  name={`progressBar${
                    progress.is_completed ? 'CheckMark' : 'ComingUp'
                  }`}
                />
              </span>
              <Paragraph type="xs">Done</Paragraph>
            </div>
          </div>
        </Card>
      </PermissionHandler>

      <div className={styles.infos}>
        <Card
          icon={<Icon size={25} name="keys" isFilled />}
          title="Requests"
          subTitle={dashboard.total_pending_requests || 0}
          description="All periods"
        />
        <Card
          icon={<OvertimeIcon />}
          title="Overtime"
          subTitle={
            dashboard.total_overtime
              ? secondsToTime(dashboard.total_overtime)
              : '0h, 00'
          }
          description="This month"
        />
        <Card
          icon={<Glyph className={styles.leaveIcon} size={25} name="upload" />}
          title="Leave"
          subTitle={
            dashboard.total_leave
              ? secondsToTime(dashboard.total_leave)
              : '0h, 00'
          }
          description="This month"
        />
        <Card
          icon={<AbsenceIcon />}
          title="Absence"
          subTitle={
            dashboard.total_leave
              ? secondsToTime(dashboard.total_absence)
              : '0h, 00'
          }
          description="This month"
        />
      </div>

      <PermissionHandler view={['admin', 'manager']}>
        <div className={styles.tables}>
          <Table
            ref={attendeesRef}
            title="Present"
            columns={tablesColumns.attendeesData}
            rows={attendeesData.result}
            hasPhoto
            size="large"
            pages={attendeesData.total}
            withPagination
            rowsPerPage={4}
            queryFunction={attendeesReq}
            stateHandler={setAttendeesData}
            headerAction={
              <Print onClick={() => setRefToPrint(attendeesRef.current)} />
            }
          />

          <Table
            ref={absenceRef}
            title="Absence"
            columns={tablesColumns.absenceData}
            rows={absenceData.result}
            hasPhoto
            size="large"
            pages={absenceData.total}
            withPagination
            rowsPerPage={4}
            queryFunction={absencesReq}
            stateHandler={setAbsenceData}
            headerAction={
              <Print onClick={() => setRefToPrint(absenceRef.current)} />
            }
          />
        </div>
      </PermissionHandler>

      <PermissionHandler view={['admin', 'manager']}>
        <div className={styles.cardBoard}>
          <CardboardTable />
        </div>
      </PermissionHandler>

      <PermissionHandler view={['employee', 'manager']}>
        <Table
          headerAction={<AddRequestModal />}
          title="My Requests"
          toolbar={{
            tableType: 'requests',
            dropDown: {
              disabled: true,
              placeholder: `${firstName} ${lastName}`,
            },
            onStartDate: (date) => {
              handleMyRequestsState('to', date)
              filteringHandler({
                query: role === 'employee' ? myRequestsReq : requestsReq,
                params: {
                  user_id: userId,
                  to: date,
                  from: myRequestsState.from,
                  limit: dashboardTablesPages.myRequests,
                },
                stateHandler: setMyRequestsData,
              })
            },
            onEndDate: (date) => {
              handleMyRequestsState('to', date)
              filteringHandler({
                query: role === 'employee' ? myRequestsReq : requestsReq,
                params: {
                  user_id: userId,
                  to: myRequestsState.to,
                  from: date,
                  limit: dashboardTablesPages.myRequests,
                },
                stateHandler: setMyRequestsData,
              })
            },
          }}
          columns={tablesColumns.myRequests}
          rows={myRequestsData.result}
          size="large"
          pages={myRequestsData.total}
          rowsPerPage={dashboardTablesPages.myRequests}
          queryFunction={role === 'employee' ? myRequestsReq : requestsReq}
          filterParams={myRequestsState}
          stateHandler={setMyRequestsData}
          withPagination
        />
      </PermissionHandler>
    </main>
  )
})

export default Dashboard
