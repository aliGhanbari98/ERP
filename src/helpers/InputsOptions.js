const options = {
  dropdown: {
    Country: [
      { name: 'Iran', id: '1' },
      { name: 'US', id: '2' },
      { name: 'Germany', id: '3' },
    ],
    City: [
      { name: 'Shiraz', id: '1' },
      { name: 'Tehran', id: '2' },
      { name: 'Newyork', id: '3' },
      { name: 'Essen', id: '4' },
    ],
    Industry: [
      { id: 'industry1', name: '1' },
      { id: 'industry1', name: '2' },
      { id: 'industry1', name: '3' },
      { id: 'industry1', name: '4' },
    ],
    Radius: [
      { id: '1', name: '15' },
      { id: '2', name: '18' },
      { id: '3', name: '22' },
      { id: '4', name: '30' },
    ],
    requestType: [
      { name: 'All', value: '' },
      { name: 'Traffic', value: 'traffic' },
      { name: 'Overtime', value: 'overtime' },
      { name: 'Eligible Leave', value: 'eligible-leave' },
      { name: 'Sick Leave', value: 'sick-leave' },
      { name: 'Incentive Leave', value: 'incentive-leave' },
      { name: 'Mission', value: 'mission' },
      { name: 'Hourly Leave', value: 'hourly-leave' },
      { name: 'Manual Leave', value: 'manual-leave' },
      { name: 'Manual Entry', value: 'manual-entry' },
    ],
    role: [
      { name: 'Admin', value: 'admin' },
      { name: 'Manager', value: 'manager' },
      { name: 'Employee', value: 'employee' },
    ],
    workplaceTypes: [
      { name: 'Remote', value: 'remote' },
      { name: 'Inplace', value: 'inplace' },
    ],
    shiftTypes: [
      { name: 'All', value: '' },
      { name: 'Full-Time', value: 'full-time' },
      { name: 'Part-Time', value: 'part-time' },
      { name: 'Hourly', value: 'hourly' },
    ],
    gender: [
      { name: 'Female', value: 'female' },
      { name: 'Male', value: 'male' },
      { name: 'Other', value: 'other' },
    ],
    weekDays: [
      { name: 'Monday', value: 'monday' },
      { name: 'Tuesday', value: 'tuesday' },
      { name: 'Wednesday', value: 'wednesday' },
      { name: 'Thursday', value: 'thursday' },
      { name: 'Friday', value: 'friday' },
      { name: 'Saturday', value: 'saturday' },
      { name: 'Sunday', value: 'sunday' },
    ],
    weekDaysIR: [
      { name: 'Saturday', value: 'saturday' },
      { name: 'Sunday', value: 'sunday' },
      { name: 'Monday', value: 'monday' },
      { name: 'Tuesday', value: 'tuesday' },
      { name: 'Wednesday', value: 'wednesday' },
      { name: 'Thursday', value: 'thursday' },
      { name: 'Friday', value: 'friday' },
    ],
    calendars: [
      { name: 'Gregorian', value: 'gregorian' },
      { name: 'Hijri', value: 'hijri' },
      { name: 'Solar Hijri', value: 'solar-hijri' },
    ],
    contractTypes: [
      { name: 'Full-Time', value: 'full-time' },
      { name: 'Part-Time', value: 'part-time' },
    ],
  },
}

export default options
