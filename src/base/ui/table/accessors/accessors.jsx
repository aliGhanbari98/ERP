import { Glyph, Icon } from '@liquid-design/liquid-design-react'
import { navigate } from '@reach/router'
// eslint-disable-next-line import/no-unresolved
import { ReactComponent as SwipeIcon } from 'assets/icons/swipe.svg'
import { Dropdown, Switch } from 'base/form'
import { Image } from 'base/ui'
import { secondsToTime } from 'helpers/datetime'
import strings from 'helpers/strings'
import { updateUserReq } from 'queries/users'
import styles from './accessors.module.scss'

const accessors = (row, key) => {
  if (
    key === 'from_datetime' ||
    key === 'to_datetime' ||
    key === 'create_datetime' ||
    key === 'contract_start_datetime'
  )
    return (
      <div className={styles.dateTime}>
        {key !== 'create_datetime' && key !== 'contract_start_datetime' && (
          <span>
            {new Date(row[key]).toLocaleString('default', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
        <span>
          {new Date(row[key]).toLocaleString('default', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </span>
      </div>
    )

  if (key === 'confirm_rejection')
    <div className={styles.confirmReject}>
      <Glyph
        size={24}
        name="arrowCheck"
        color="primary.light"
        onClick={(e) => {
          e.stopPropagation()
          row.handleStatus(row, 'approved')
        }}
      />

      <Glyph
        size={24}
        name="close"
        color="primary.light"
        onClick={(e) => {
          e.stopPropagation()
          row.handleStatus(row, 'rejected')
        }}
      />
    </div>

  if (key === 'actions')
    return (
      <div className={styles.actions}>
        {row[key].map(({ iconName, iconColor, className, onClick }, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onClick instanceof Function && onClick(row)}
          >
            <Glyph
              key={iconName}
              size={24}
              className={className}
              name={iconName}
              color={iconColor}
              isFilled
            />
          </button>
        ))}
      </div>
    )

  if (key === 'manager_decision' || key === 'admin_decision')
    return (
      <span className={styles[row[key]]}>
        {row[key].charAt(0).toUpperCase() + row[key].slice(1)}
      </span>
    )

  if (key === 'decision') {
    return (
      <div className={styles.decision}>
        <span className={styles[row.admin.decision]}>
          {row.admin.decision.charAt(0).toUpperCase() +
            row.admin.decision.slice(1)}
        </span>

        <span className={styles[row.manager.decision]}>
          {row.manager.decision.charAt(0).toUpperCase() +
            row.manager.decision.slice(1)}
        </span>
      </div>
    )
  }

  if (key === 'photo') {
    let photo = '/images/blank_profile.jpg'
    if (row.avatar_url) photo = row.avatar_url
    else if (row.user && row.user.avatar_url) photo = row.user.avatar_url

    return (
      <Image
        className={styles.profilePhoto}
        src={photo}
        alt="avatar"
        width={42}
        height={42}
        borderRadius="100%"
      />
    )
  }

  if (key === 'worklog_details')
    return (
      <button
        type="button"
        className={styles.details}
        onClick={() => navigate(`/dashboard/worklog/details/${row.user_id}`)}
      >
        <Glyph size={16} name="options" />
      </button>
    )

  if (key === 'details') {
    return (
      <button
        type="button"
        className={styles.details}
        onClick={row.onDetailsClick}
      >
        <Glyph size={16} name="options" />
      </button>
    )
  }

  if (key === 'traffics' && row[key]) {
    return (
      <div className={styles.trafficSummary}>
        <div className={styles.enter}>
          <Glyph size={18} name="upload" />
          <span>{row[key].entry_datetime}</span>
        </div>

        <div className={styles.leave}>
          <Glyph size={18} name="upload" />
          <span>{row[key].leave_datetime}</span>
        </div>
      </div>
    )
  }

  if (
    (key === 'overtime_edit' ||
      key === 'surplus_attendance_edit' ||
      key === 'mission_edit' ||
      key === 'absent_edit' ||
      key === 'leave_edit') &&
    row[key] !== undefined
  ) {
    return (
      <div className={`${styles.worklogDetailsActions} ${styles[key]}`}>
        <span>{`${secondsToTime(row[key], '').hours}h`}</span>

        <button
          type="button"
          className={styles.edit}
          onClick={() => row.onEdit(row)}
        >
          <Icon size={18} name="pencil" isFilled />
        </button>
      </div>
    )
  }

  if (key === 'traffic_details')
    return (
      <button
        type="button"
        className={styles.workLogDetails}
        onClick={() => row.onDetails(row)}
      >
        <SwipeIcon />
      </button>
    )

  if (key === 'shift_actions')
    return (
      <div className={styles.shiftActions}>
        <button
          type="button"
          className={styles.edit}
          onClick={() => row.onEdit(row)}
        >
          <Icon name="pencil" size={20} isFilled />
        </button>

        <button
          type="button"
          className={styles.info}
          onClick={() => row.onInfo(row)}
        >
          <Glyph name="tooltipFilled" size={20} />
        </button>

        <button
          type="button"
          className={styles.group}
          onClick={() => row.onEmployees(row)}
        >
          <Icon name="people" size={20} isFilled />
        </button>

        <button
          type="button"
          className={styles.delete}
          onClick={() => row.onDelete(row)}
        >
          <Icon name="bin" size={20} isFilled />
        </button>
      </div>
    )

  if (key === 'personnel_name' || key === 'request_type')
    return (
      <Dropdown
        className={styles.addRequestDropdown}
        options={row[key]}
        placeholder="Select"
      />
    )

  if (key === 'request_delete')
    return (
      <button type="button" className={styles.deleteRequest}>
        <Icon name="bin" size={24} isFilled />
      </button>
    )

  if (key === 'today_traffic_details') {
    return (
      <span className={`${styles.todayTraffic} ${styles[row[key]]}`}>
        {row[key]}
      </span>
    )
  }

  if (key === 'personnel_actions') {
    const handleChange = (value) => {
      updateUserReq({ id: row.id, body: { is_enable: value } }).catch(() => {})
    }

    return (
      <div className={styles.personnelActions}>
        <Switch checked={row.is_enable} onChange={handleChange} />

        <button type="button" onClick={row.onEdit}>
          <Icon name="pencil" size={20} isFilled />
        </button>
      </div>
    )
  }

  if (key === 'term_details') {
    return (
      <div className={styles.termDetails}>
        <button
          type="button"
          onClick={row.onDetails}
          className={styles.details}
        >
          <Glyph size={16} name="options" />
        </button>
        <Icon name="pencil" size={24} isFilled onClick={row.onEdit} />
        <Icon name="bin" size={24} isFilled onClick={row.onDelete} />
      </div>
    )
  }

  if (key === 'team') return row.team && row.team.name

  if (key === 'teams')
    return row.teams && row.teams.map((team) => team.name).join(', ')

  if (key === 'shift') return row.shift && row.shift.name

  if (key === 'radius') return `${row.radius}m`

  if (key === 'day') {
    const date = new Date(row.register_datetime)
    return strings.weekDays[date.getDay()]
  }

  if (key === 'shift_type') return strings.shiftTypes[row[key]]

  if (key === 'date' || key === 'register_datetime')
    return new Date(row[key]).toLocaleString('default', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

  if (key === 'manager') {
    const { first_name: firstName, last_name: lastName } =
      row.members.find(({ role }) => role === 'manager') || {}
    return `${firstName || ''} ${lastName || ''}`
  }

  if (key === 'number_of_members') return row.members.length

  if (key === 'entry_datetime' || key === 'leave_datetime')
    return (
      row[key] &&
      new Date(row[key]).toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )

  if (key === 'name') {
    let name = ''
    if (row.user)
      name = `${row.user.first_name || ''} ${row.user.last_name || ''}`
    else name = `${row.first_name || ''} ${row.last_name || ''}`

    return name
  }

  const secondsToParse = [
    'duration',
    'total_attendance',
    'absence',
    'absent',
    'overtime',
    'mission',
    'leave',
    'hourly_leave',
    'holiday',
    'weekend',
    'total_salary',
    'surplus',
  ]
  if (secondsToParse.indexOf(key) > -1)
    return `${secondsToTime(row[key], '').hours}h`

  return ''
}

export default accessors
