import { useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { Paragraph, Headline } from '@liquid-design/liquid-design-react'
import { DatePicker, Dropdown } from 'base/form'
import { Modal, Table, Navigator } from 'base/ui'
import { AddRequestModal } from 'base/ui/modals'
import CircularProgress from 'base/ui/circular_progress'
import PermissionHandler from 'helpers/permissionHandler'
import tablesColumns from 'helpers/tablesColumns'
import { secondsToTime, UTCToDate, UTCToTime } from 'helpers/datetime'
import { authStore, personnelStore } from 'stores'
import { worklogTrafficReq, worklogsReq } from 'queries/worklogs'
import { userWorklogDetailReq, getUserReq } from 'queries/users'
import {
  profileReq,
  myWorklogsDetailsReq,
  myWorklogsReq,
} from 'queries/profile'
import styles from './index.module.scss'

const calculateProgress = (current, max) => (current / max) * 100

const WorklogDetails = observer(({ userId }) => {
  const { personnels } = personnelStore
  const { userData } = authStore
  const date = new Date()
  const [fields, setFields] = useState({
    user_id: userId,
    from: new Date(date.getFullYear(), date.getMonth(), 1),
    to: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  })
  const [detailsData, setDetailsData] = useState({ total: 0, result: [] })
  const [detailsModal, setDetailsModal] = useState(false)
  const [user, setUser] = useState({})
  const [traffic, setTraffic] = useState([])
  const [overalView, setOveralView] = useState({
    absence: { used: '0' },
    leave: { used: '0' },
    attendance: { used: '0' },
    mission: { used: '0' },
    overtime: { used: '0' },
  })
  const [addModal, setAddModal] = useState(false)

  const handleEdit = (data) => {
    setAddModal(true)
  }

  const handleDetails = (row) => {
    worklogTrafficReq({ user_id: userId, date: row.date })
      .then((result) => {
        const temp = []
        result.forEach((item) => {
          temp.push({
            today_traffic_details: 'Entry',
            date: UTCToDate(item.entry_datetime),
            time: UTCToTime(item.entry_datetime),
            workplace: item.workplace.name,
          })
          temp.push({
            today_traffic_details: 'Leave',
            date: UTCToDate(item.leave_datetime),
            time: UTCToTime(item.leave_datetime),
            workplace: item.workplace.name,
          })
        })
        setTraffic(temp)
        setDetailsModal(true)
      })
      .catch(() => {})
  }

  const getData = () => {
    const detailsQuery =
      userData.role === 'employee' ? myWorklogsDetailsReq : userWorklogDetailReq
    const worklogsQuery =
      userData.role === 'employee' ? myWorklogsReq : worklogsReq
    Promise.all([
      detailsQuery({
        id: userId,
        params: { from: fields.from, to: fields.to },
      })
        .then(
          (data) =>
            console.log({ detail: data }) ||
            setDetailsData({
              ...data,
              data: data.result.map((item) => ({
                ...item,
                absent_edit: item.absent,
                leave_edit: item.leave,
                overtime_edit: item.overtime,
                surplus_attendance_edit: item.surplus_attendance,
                mission_edit: item.mission,
                onEdit: handleEdit,
                onDetails: handleDetails,
              })),
            })
        )
        .catch(() => {}),
      worklogsQuery({ ...fields })
        .then((res) => {
          const data = res.data ? res.data[0] : res // because responses from two end-points are different!
          return { nextQuery: profileReq, data }
        })
        .then(({ nextQuery, data }) =>
          nextQuery().then(({ remained_times: remainedTimes }) =>
            setOveralView({
              absence: { used: secondsToTime(data.absent, 'seperate') },
              leave: {
                used: secondsToTime(data.leave, 'seperate'),
                max:
                  remainedTimes.remained_eligible_leave +
                  remainedTimes.remained_sick_leave +
                  data.leave,
                progress: calculateProgress(
                  data.leave,
                  remainedTimes.remained_eligible_leave +
                    remainedTimes.remained_sick_leave +
                    data.leave
                ),
              },
              attendance: {
                used: secondsToTime(data.total_attendance, 'seperate'),
                max:
                  remainedTimes.total_expected_attendance +
                  data.total_attendance,
                progress: calculateProgress(
                  data.total_attendance,
                  remainedTimes.total_expected_attendance +
                    data.total_attendance
                ),
              },
              mission: { used: secondsToTime(data.mission, 'seperate') },
              overtime: {
                used: secondsToTime(data.overtime, 'seperate'),
                max: remainedTimes.remained_overtime + data.overtime,
                progress: calculateProgress(
                  data.overtime,
                  remainedTimes.remained_overtime + data.overtime
                ),
              },
            })
          )
        ),
    ])
  }

  useEffect(() => {
    getData()
  }, [fields])

  useEffect(() => {
    getUserReq(userId, { validRoles: ['admin', 'manager'] })
      .then((data) => setUser(data))
      .catch(() => {})
    getData()
  }, [userId])

  const handleUserChange = (value) => {
    setFields((prevState) => ({ ...prevState, user_id: value.id }))
    navigate(`/dashboard/worklog/details/${value.id}`)
  }

  return (
    <main className={styles.worklogDetails}>
      <Navigator
        prevLabel="Work log"
        currentLabel="Work log detail"
        path={userId && '/dashboard/worklog'}
      />

      <div className={styles.overall}>
        <Headline type="H3">Overall View</Headline>

        <div className={styles.filters}>
          <Dropdown
            label=" "
            className={styles.dropdown}
            options={personnels.slice(1)} // because this filter should not have all personnel option
            onClick={handleUserChange}
            defaultItem={user ? { value: user.id, key: 'id' } : null}
            disabled={userData.role === 'employee'}
            placeholder={
              userData.role === 'employee'
                ? `${userData.first_name || ''} ${userData.last_name || ''}`
                : `${user.first_name || ''} ${user.last_name || ''}`
            }
          />

          {/* <DatePicker
            className={styles.datePicker}
            rangeMode
            withCalendar
            startDateLabel="From"
            defaultStartDate={fields.from}
            startDateChange={(value) =>
              setFields((prevState) => {
                const prev = prevState
                prev.from = value
                return prev
              })
            }
            endDateLabel="To"
            endDateChange={(value) =>
              setFields((prevState) => ({ ...prevState, to: value }))
            }
            defaultEndDate={fields.to}
          /> */}

          <DatePicker
            className={styles.datePicker}
            withCalendar
            startDateLabel="From"
            defaultStartDate={fields.from}
            startDateChange={(value) =>
              setFields((prevState) => ({
                ...prevState,
                from: value,
              }))
            }
          />

          <DatePicker
            className={styles.datePicker}
            withCalendar
            startDateLabel="To"
            defaultStartDate={fields.to}
            startDateChange={(value) =>
              setFields((prevState) => ({
                ...prevState,
                to: value,
              }))
            }
          />
        </div>

        <div className={styles.progresses}>
          <div className={`${styles.progress} ${styles.delay}`}>
            <CircularProgress
              label="not working"
              value={overalView.absence.used}
              progressValue={overalView.absence.progress}
            />
            <Paragraph>Absence</Paragraph>
          </div>

          <div className={`${styles.progress} ${styles.surplus}`}>
            <CircularProgress
              label={`of ${overalView.leave.max || 0} available`}
              value={overalView.leave.used}
              progressValue={overalView.leave.progress}
            />
            <Paragraph>Leave</Paragraph>
          </div>

          <div className={`${styles.progress} ${styles.present}`}>
            <CircularProgress
              label={`of ${overalView.attendance.max || 0} available`}
              progressValue={overalView.attendance.progress}
              value={overalView.attendance.used}
            />
            <Paragraph>Attendance</Paragraph>
          </div>

          <div className={`${styles.progress} ${styles.mission}`}>
            <CircularProgress
              label="out of workplace"
              value={overalView.mission.used}
              progressValue={overalView.mission.progress}
            />
            <Paragraph>Misson</Paragraph>
          </div>

          <div className={`${styles.progress} ${styles.overtime}`}>
            <CircularProgress
              label={`of ${overalView.overtime.max || 0} available`}
              value={overalView.overtime.used}
              progressValue={overalView.overtime.progress}
            />
            <Paragraph>Overtime</Paragraph>
          </div>
        </div>
      </div>

      <PermissionHandler view={['admin', 'manager', 'employee']}>
        <Table
          columns={
            userData.role !== 'employee'
              ? tablesColumns.teamWorkLogDetails
              : tablesColumns.teamWorkLogDetailsEmployee
          }
          rows={detailsData.data}
          size="large"
          pages={detailsData.total}
          withPagination
          onPageChange={() =>
            setDetailsData((prevState) => {
              const prev = prevState
              const reversed = prev.slice().reverse()
              return [...reversed]
            })
          }
        />
      </PermissionHandler>

      <Modal
        overlayClassName={styles.detailsModal}
        isOpen={detailsModal}
        onClose={() => setDetailsModal(false)}
      >
        <Table
          title="Today worklog details"
          columns={tablesColumns.todayWorkLogDetails}
          rows={traffic}
          size="large"
        />
      </Modal>

      <AddRequestModal
        defaultTrigger={false}
        open={addModal}
        onClose={() => setAddModal(false)}
      />
    </main>
  )
})

export default WorklogDetails
