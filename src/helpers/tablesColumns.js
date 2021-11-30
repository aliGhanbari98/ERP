import tablesAccessors from 'base/ui/table/accessors/accessors'
import formTableAccessors from 'base/ui/form_table/accessors'

const tablesColumns = {
  attendeesData: [
    { header: '', key: 'photo', accessor: tablesAccessors },
    { header: 'Name', key: 'name', accessor: tablesAccessors },
    { header: 'Team', key: 'team', accessor: tablesAccessors },
    { header: 'Location', key: 'workplaces', accessor: tablesAccessors },
    { header: 'Entry', key: 'entry_datetime', accessor: tablesAccessors },
  ],

  absenceData: [
    { header: '', key: 'photo', accessor: tablesAccessors },
    { header: 'Name', key: 'name', accessor: tablesAccessors },
    { header: 'Team', key: 'team', accessor: tablesAccessors },
    { header: 'Exit', key: 'leave_datetime', accessor: tablesAccessors },
  ],

  cardBoard: [
    {
      header: '',
      key: 'photo',
      accessor: tablesAccessors,
    },
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Team',
      key: 'team',
    },
    {
      header: 'Request type',
      key: 'request_type',
    },
    {
      header: 'From',
      key: 'from_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'To',
      key: 'to_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'Duration',
      key: 'duration',
      accessor: tablesAccessors,
    },
    {
      header: 'Confirm/Rejection',
      key: 'confirm_rejection',
      accessor: tablesAccessors,
    },
    {
      header: 'Team manager',
      key: 'decision',
      accessor: tablesAccessors,
    },
  ],

  adminRequests: [
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Team',
      key: 'team',
    },
    {
      header: 'Request Type',
      key: 'requestType',
    },
    {
      header: 'Date of Registration',
      key: 'dateOfRegistration',
    },
    {
      header: 'From',
      key: 'from',
      accessor: tablesAccessors,
    },
    {
      header: 'To',
      key: 'to',
      accessor: tablesAccessors,
    },
    {
      header: 'Duration',
      key: 'duration',
    },
    {
      header: 'Decision',
      key: 'decision',
      accessor: tablesAccessors,
    },
  ],

  otherRequests: [
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Team',
      key: 'team',
    },
    {
      header: 'Request Type',
      key: 'request_type',
    },
    {
      header: 'Date of Registration',
      key: 'create_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'From',
      key: 'from_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'To',
      key: 'to_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'Duration',
      key: 'duration',
      accessor: tablesAccessors,
    },
    {
      header: 'Decision',
      key: 'decision',
      accessor: tablesAccessors,
    },
  ],

  personnel: [
    // TODO: personel code must be the first column
    {
      header: '',
      key: 'photo',
      accessor: tablesAccessors,
    },
    {
      header: 'Personnel Code',
      key: 'employee_code',
    },
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Team',
      key: 'team',
      accessor: tablesAccessors,
    },
    {
      header: 'Working Start Date',
      key: 'contract_start_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'Shift',
      key: 'shift',
      accessor: tablesAccessors,
    },
    {
      header: 'Work Place',
      key: 'workPlace',
      accessor: tablesAccessors,
    },
    {
      header: 'Actions',
      key: 'personnel_actions',
      accessor: tablesAccessors,
    },
  ],

  worklogs: [
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Total attendance',
      key: 'total_attendance',
      accessor: tablesAccessors,
    },
    {
      header: 'Absent',
      key: 'absent',
      accessor: tablesAccessors,
    },
    {
      header: 'Overtime',
      key: 'overtime',
      accessor: tablesAccessors,
    },
    {
      header: 'Mission',
      key: 'mission',
      accessor: tablesAccessors,
    },
    {
      header: 'Leave',
      key: 'leave',
      accessor: tablesAccessors,
    },
    {
      header: 'Surplus attendance',
      key: 'surplus_attendance',
      accessor: tablesAccessors,
    },
    {
      header: 'Workday',
      key: 'work_days',
    },
    {
      header: 'Details',
      key: 'worklog_details',
      accessor: tablesAccessors,
    },
  ],

  teamWorkLogDetails: [
    {
      header: 'Date',
      key: 'date',
      accessor: tablesAccessors,
    },
    {
      header: 'Day',
      key: 'day',
      accessor: tablesAccessors,
    },
    {
      header: 'Traffic Summary',
      key: 'traffic_summary',
      accessor: tablesAccessors,
    },
    {
      header: 'Daily Attendance',
      key: 'daily_attendance',
    },
    {
      header: 'Absent',
      key: 'absent_edit',
      accessor: tablesAccessors,
    },
    {
      header: 'Leave',
      key: 'leave_edit',
      accessor: tablesAccessors,
    },
    {
      header: 'Overtime',
      key: 'overtime_edit',
      accessor: tablesAccessors,
    },
    {
      header: 'Surplus Attendance',
      key: 'surplus_attendance_edit',
      accessor: tablesAccessors,
    },
    {
      header: 'Mission',
      key: 'mission_edit',
      accessor: tablesAccessors,
    },
    {
      header: 'Traffic Details',
      key: 'traffic_details',
      accessor: tablesAccessors,
    },
  ],
  teamWorkLogDetailsEmployee: [
    {
      header: 'Date',
      key: 'register_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'Day',
      key: 'day',
      accessor: tablesAccessors,
    },
    {
      header: 'Traffic Summary',
      key: 'traffics',
      accessor: tablesAccessors,
    },
    {
      header: 'Daily Attendance',
      key: 'total_attendance',
    },
    {
      header: 'Absent',
      key: 'absent',
      accessor: tablesAccessors,
    },
    {
      header: 'Leave',
      key: 'hourly_leave',
      accessor: tablesAccessors,
    },
    {
      header: 'Overtime',
      key: 'overtime',
      accessor: tablesAccessors,
    },
    {
      header: 'Surplus Attendance',
      key: 'surplus',
      accessor: tablesAccessors,
    },
    {
      header: 'Mission',
      key: 'mission',
      accessor: tablesAccessors,
    },
    {
      header: 'Traffic Details',
      key: 'traffic_details',
      accessor: tablesAccessors,
    },
  ],

  todayWorkLogDetails: [
    {
      header: 'Traffic details',
      key: 'today_traffic_details',
      accessor: tablesAccessors,
    },
    {
      header: 'Date',
      key: 'date',
    },
    {
      header: 'Time',
      key: 'time',
    },
    {
      header: 'Workplace',
      key: 'workplace',
    },
  ],

  workplaceManagement: [
    {
      header: 'Workplace Name',
      key: 'name',
    },
    {
      header: 'Location',
      key: 'country',
    },
    {
      header: 'Radius',
      key: 'radius',
      accessor: tablesAccessors,
    },
    {
      header: 'Actions',
      key: 'actions',
      accessor: tablesAccessors,
    },
  ],

  members: [
    {
      header: '',
      key: 'photo',
      accessor: tablesAccessors,
    },
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Workplace',
      key: 'workplace',
      accessor: tablesAccessors,
    },
    {
      header: 'Teams',
      key: 'teams',
      accessor: tablesAccessors,
    },

    {
      header: '',
      key: 'actions',
      accessor: tablesAccessors,
    },
  ],

  teams: [
    {
      header: 'Team Name',
      key: 'name',
    },
    {
      header: 'Team Manager',
      key: 'manager',
      accessor: tablesAccessors,
    },
    {
      header: 'Number of Members',
      key: 'number_of_members',
      accessor: tablesAccessors,
    },

    {
      header: 'Actions',
      key: 'actions',
      accessor: tablesAccessors,
    },
  ],

  addShift: [
    {
      header: 'Days',
      key: 'day',
      accessor: formTableAccessors,
    },
    {
      header: 'From',
      key: 'from',
      accessor: formTableAccessors,
    },
    {
      header: 'To',
      key: 'to',
      accessor: formTableAccessors,
    },
    {
      header: 'Off Days',
      key: 'off_days',
      accessor: formTableAccessors,
    },
  ],

  shifts: [
    {
      header: 'Shift name',
      key: 'name',
    },
    {
      header: 'Shift type',
      key: 'shift_type',
      accessor: tablesAccessors,
    },
    {
      header: 'Actions',
      key: 'shift_actions',
      accessor: tablesAccessors,
    },
  ],
  shiftInfo: [
    {
      header: 'Property',
      key: 'property',
    },
    {
      header: 'Value',
      key: 'value',
    },
  ],

  myRequests: [
    {
      header: '',
      key: 'photo',
      accessor: tablesAccessors,
    },
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Team',
      key: 'team',
    },
    {
      header: 'Request type',
      key: 'request_type',
    },
    {
      header: 'Date of registration',
      key: 'date_of_registration',
    },
    {
      header: 'From',
      key: 'from_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'To',
      key: 'to_datetime',
      accessor: tablesAccessors,
    },
    {
      header: 'Duration',
      key: 'duration',
      accessor: tablesAccessors,
    },
    {
      header: 'Decision',
      key: 'decision',
      accessor: tablesAccessors,
    },
  ],

  addRequest: [
    {
      header: 'Date',
      key: 'date',
    },
    {
      header: 'From',
      key: 'from',
    },
    {
      header: 'To',
      key: 'to',
    },
    {
      header: 'Duration',
      key: 'duration',
    },
    {
      header: 'Personnel name',
      key: 'personnel_name',
      accessor: tablesAccessors,
    },
    {
      header: 'Request type',
      key: 'request_type',
      accessor: tablesAccessors,
    },
    {
      header: 'Description',
      key: 'description',
    },
    {
      header: '',
      key: 'request_delete',
      accessor: tablesAccessors,
    },
  ],

  accounting: [
    {
      header: 'Name',
      key: 'name',
      accessor: tablesAccessors,
    },
    {
      header: 'Total attendance',
      key: 'total_attendance',
      accessor: tablesAccessors,
    },
    {
      header: 'Absence',
      key: 'absence',
      accessor: tablesAccessors,
    },
    {
      header: 'Overtime',
      key: 'overtime',
      accessor: tablesAccessors,
    },
    {
      header: 'Mission',
      key: 'mission',
      accessor: tablesAccessors,
    },
    {
      header: 'Holiday overtime',
      key: 'holiday',
      accessor: tablesAccessors,
    },
    {
      header: 'Weekend overtime',
      key: 'weekend',
      accessor: tablesAccessors,
    },
    {
      header: 'Total salary',
      key: 'total_salary',
      accessor: tablesAccessors,
    },
    {
      header: 'Details',
      key: 'details',
      accessor: tablesAccessors,
    },
  ],
  userAccounting: [
    {
      header: 'Month',
      key: 'month',
    },
    {
      header: 'Total attendance',
      key: 'total_attendance',
      accessor: tablesAccessors,
    },
    {
      header: 'Absence',
      key: 'absence',
      accessor: tablesAccessors,
    },
    {
      header: 'Overtime',
      key: 'overtime',
      accessor: tablesAccessors,
    },
    {
      header: 'Mission',
      key: 'mission',
      accessor: tablesAccessors,
    },
    {
      header: 'Holiday overtime',
      key: 'holiday',
      accessor: tablesAccessors,
    },
    {
      header: 'Weekend overtime',
      key: 'weekend',
      accessor: tablesAccessors,
    },
    {
      header: 'Total salary',
      key: 'total_salary',
      accessor: tablesAccessors,
    },
  ],

  terms: [
    { header: 'Name', key: 'name' },
    { header: 'Absence', key: 'absence_limit' },
    { header: 'Mission lmt.', key: 'mission_limit' },
    { header: 'Overtime lmt.', key: 'overtime_limit' },
    { header: 'Weekend overtime lmt.', key: 'weekend_overtime_limit' },
    { header: 'Holiday overtime lmt.', key: 'holiday_overtime_limit' },
    { header: 'Details', key: 'term_details', accessor: tablesAccessors },
  ],
}

export default tablesColumns
