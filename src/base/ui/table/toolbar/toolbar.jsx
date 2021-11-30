import { DatePicker, Dropdown } from 'base/form'
import inputsOption from 'helpers/InputsOptions'
import styles from './toolbar.module.scss'

const CardBoard = ({ personnel, onStartDate, onEndDate, requestType }) => (
  <div className={styles.toolbar}>
    <Dropdown
      onClick={personnel.onClick}
      placeholder="All personnel"
      options={personnel.options || []}
    />

    <DatePicker
      className={styles.datePicker}
      withCalendar
      startDateLabel="From"
      startDateChange={onStartDate}
    />

    <DatePicker
      className={styles.datePicker}
      withCalendar
      startDateLabel="To"
      startDateChange={onEndDate}
    />

    <Dropdown
      onClick={requestType.onClick}
      placeholder="Request type"
      options={inputsOption.dropdown.requestType}
    />
  </div>
)

const Requests = ({
  dropDown,
  placeHolder,
  options,
  onStartDate,
  onEndDate,
}) => {
  // const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  return (
    <div className={styles.toolbar}>
      <Dropdown
        onClick={dropDown.onClick}
        placeholder={dropDown.placeholder ? dropDown.placeholder : placeHolder}
        options={options}
        disabled={dropDown.disabled}
      />

      <DatePicker
        className={styles.datePicker}
        withCalendar
        startDateLabel="From"
        startDateChange={onStartDate}
      />

      <DatePicker
        className={styles.datePicker}
        withCalendar
        startDateLabel="To"
        startDateChange={onEndDate}
      />

      {/* <div className={styles.tabs}>
        {reqTypes.map((item, index) => (
          <span
            className={selectedTabIndex === index && styles.selected}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedTabIndex(index)}
          >
            {item}
          </span>
        ))}
      </div> */}
    </div>
  )
}

const TeamWorkLogToolbar = ({
  personnelOptions,
  personnelOnClick,
  onStartDate,
  onEndDate,
}) => {
  return (
    <div className={styles.toolbar}>
      <Dropdown
        options={personnelOptions}
        onClick={personnelOnClick}
        placeholder="All personnel"
      />

      <DatePicker
        className={styles.datePicker}
        withCalendar
        startDateLabel="From"
        startDateChange={onStartDate}
      />

      <DatePicker
        className={styles.datePicker}
        withCalendar
        startDateLabel="To"
        startDateChange={onEndDate}
      />
    </div>
  )
}

const TeamWorkLogDetailsToolbar = ({
  userValue,
  userOnClick,
  userOptions,
  periodValue,
  periodOnClick,
  periodOptions,
}) => {
  return (
    <div className={styles.teamWorkLogDetails}>
      <Dropdown
        options={userOptions}
        value={userValue}
        onClick={userOnClick}
        placeholder="User"
        label=" "
      />

      <Dropdown
        options={periodOptions}
        value={periodValue}
        onClick={periodOnClick}
        placeholder="Period"
        label="Period"
      />
    </div>
  )
}

const Accounting = ({ personnel, months }) => (
  <div className={styles.toolbar}>
    <Dropdown
      placeholder="All personnel"
      options={personnel.options}
      onClick={personnel.onClick}
    />

    <Dropdown
      options={months.options || []}
      defaultItem={{ value: new Date().getMonth() + 1, key: 'value' }}
      onClick={months.onClick}
    />
  </div>
)

const UserAccounting = ({ months }) => (
  <div className={styles.toolbar}>
    <Dropdown
      options={months.options || []}
      defaultItem={{ value: new Date().getMonth() + 1, key: 'value' }}
      onClick={months.onClick}
    />
  </div>
)

const SingleDropDown = ({ options, placeholder, onClick }) => (
  <div className={styles.toolbar}>
    <Dropdown placeholder={placeholder} options={options} onClick={onClick} />
  </div>
)

const items = {
  cardBoard: CardBoard,
  requests: Requests,
  teamWorkLog: TeamWorkLogToolbar,
  teamWorkLogDetails: TeamWorkLogDetailsToolbar,
  accounting: Accounting,
  userAccounting: UserAccounting,
  singleDropDown: SingleDropDown,
}

const TableToolbar = (props) => {
  const { tableType, ...rest } = props
  const Toolbar = items[tableType]
  return Toolbar ? <Toolbar {...rest} /> : null
}

export default TableToolbar
