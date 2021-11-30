/* eslint-disable camelcase */
// modules
import { useState, useEffect } from 'react'
import { StepProgressBar } from '@liquid-design/liquid-design-react'
// helpers
import tablesColumns from 'helpers/tablesColumns'
import tablesRowscounts from 'helpers/tablesRowsCount'
import { useToggle } from 'helpers/hooks'
// queries
import {
  getTermsReq,
  deleteTermReq,
  createTermReq,
  getTermsByIdReq,
  updateTermsReq,
} from 'queries/terms'
// components
import { FormLayout, Table } from 'base/ui'
import { ContractModal } from 'base/ui/modals'
import Overal from './components/overal'
import MissionAndAbsence from './components/missionAbsence'
import Overview from './components/overview'
// styles
import styles from './index.module.scss'

const validator = (target) =>
  target.findIndex(
    ({ min_second, max_second, rate }) =>
      typeof max_second !== 'number' ||
      typeof min_second !== 'number' ||
      typeof rate !== 'number'
  )

const modalFormatter = (array, targetId) => {
  const data = array.find(({ id }) => id === targetId)
  return [
    {
      terms: 'Absence',
      limitation: data.max_eligible_leave + data.max_sick_leave,
      rates: data.absent_rates,
    },
    { terms: 'Mission', rates: data.mission_rates },
    {
      terms: 'Overtime',
      limitation: data.daily_overtime_limit,
      rates: data.overtime_rates,
    },
    {
      terms: 'Weekend overtime',
      limitation: data.daily_weekend_limit,
      rates: data.weekend_rates,
    },
    {
      terms: 'Holiday overtime',
      limitation: data.daily_holiday_limit,
      rates: data.holiday_rates,
    },
    {
      terms: 'Montly overtime',
      limitation: data.max_overtime_allowed,
    },
  ]
}

const responseToStateConverter = ({
  name,
  id,
  max_flexible,
  max_eligible_leave,
  is_holiday_included,
  is_weekend_included,
  max_overtime_allowed,
  absent_rates,
  mission_rates,
  overtime_rates,
  weekend_rates,
  holiday_rates,
}) => ({
  overal: {
    id,
    name,
    max_flexible,
    max_eligible_leave,
    is_holiday_included,
    is_weekend_included,
  },
  missionAndAbsence: {
    absenceRates: absent_rates.map((item, i) => ({
      id: Date.now() + i,
      ...item,
    })),
    missionRates: mission_rates.map((item, i) => ({
      id: Date.now() + i,
      ...item,
    })),
  },
  overview: {
    max_overtime_allowed,
    regularRates: overtime_rates.map((item, i) => ({
      id: Date.now() + i,
      ...item,
    })),
    weekendRates: weekend_rates.map((item, i) => ({
      id: Date.now() + i,
      ...item,
    })),
    holidayRates: holiday_rates.map((item, i) => ({
      id: Date.now() + i,
      ...item,
    })),
  },
})

const ContractTerms = () => {
  const [stage, setStage] = useState('overal')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [tableData, setTableData] = useState([])
  const [updatingTermId, setUpdatingTermId] = useState('')
  const { value: confirmIsLoading, toggle: toggleConfirmIsLoading } = useToggle(
    false
  )

  const [termData, setTermData] = useState({
    overal: { is_holiday_included: false, is_weekend_included: false },
    missionAndAbsence: {
      absenceRates: [{ id: '1', min_second: 0, max_second: 24, rate: 1 }],
      missionRates: [{ id: '1', min_second: 0, max_second: 24, rate: 1 }],
    },
    overview: {
      regularRates: [{ id: '1', min_second: 0, max_second: 24, rate: 1 }],
      weekendRates: [{ id: '1', min_second: 0, max_second: 24, rate: 1 }],
      holidayRates: [{ id: '1', min_second: 0, max_second: 24, rate: 1 }],
    },
  })

  const formatters = {
    table: ({ total, result }) => ({
      total,
      result: result.map((item) => ({
        name: item.name,
        absence_limit: item.max_eligible_leave,
        overtime_limit: item.daily_overtime_limit,
        weekend_overtime_limit: item.daily_weekend_limit,
        holiday_overtime_limit: item.daily_holiday_limit,
        onDetails: () => {
          setModalData(modalFormatter(result, item.id))
          setModalIsOpen(true)
        },
        onDelete: () => {
          deleteTermReq(item.id)
            .then(() =>
              getTermsReq({
                limit: tablesRowscounts.terms.templateOfTerms,
              })
            )
            .then((newData) => setTableData(formatters.table(newData)))
            .catch()
        },
        onEdit: () => {
          getTermsByIdReq(item.id).then((singleTermData) => {
            const converted = responseToStateConverter(singleTermData)
            setTermData(converted)
            setUpdatingTermId(item.id)
            const doc = document.getElementById('master-page')
            doc.scrollTo({ top: 0, behavior: 'smooth' })
          })
        },
      })),
    }),
    requestBody: (data) => ({
      ...data.overal,
      absent_rates: data.missionAndAbsence.absenceRates,
      mission_rates: data.missionAndAbsence.missionRates,
      overtime_rates: data.overview.regularRates,
      weekend_rates: data.overview.weekendRates,
      holiday_rates: data.overview.holidayRates,
    }),
  }

  const handleTermData = (key, value) =>
    setTermData((prevState) => ({
      ...prevState,
      [stage]: { ...prevState[stage], [key]: value },
    }))

  const stagesMap = {
    overal: {
      buttons: {
        okOnClick: () => setStage('missionAndAbsence'),
        okTitle: 'Next',
        okDisabled:
          !termData.overal.name ||
          typeof termData.overal.max_eligible_leave !== 'number' ||
          typeof termData.overal.max_flexible !== 'number',
      },
      component: Overal,
      progress: 0,
    },
    missionAndAbsence: {
      buttons: {
        okOnClick: () => setStage('overview'),
        okTitle: 'Next',
        okDisabled:
          validator(termData.missionAndAbsence.absenceRates) >= 0 ||
          validator(termData.missionAndAbsence.missionRates) >= 0,
        cancelOnClick: () => setStage('overal'),
        cancelTitle: 'Back',
      },
      component: MissionAndAbsence,
      progress: 1,
    },
    overview: {
      buttons: {
        okOnClick: () => {
          toggleConfirmIsLoading()
          const query = updatingTermId
            ? updateTermsReq({
                id: updatingTermId,
                body: formatters.requestBody(termData),
              })
            : createTermReq(formatters.requestBody(termData))
          return query
            .then(() =>
              getTermsReq({
                limit: tablesRowscounts.terms.templateOfTerms,
              })
            )
            .then((newData) => {
              setTableData(formatters.table(newData)) // updating the table
              toggleConfirmIsLoading()
              setStage('overal')
            })
            .catch()
        },
        okTitle: updatingTermId ? 'Update' : 'Finish',
        isLoading: confirmIsLoading,
        okDisabled:
          !termData.overview.max_overtime_allowed ||
          validator(termData.overview.regularRates) >= 0 ||
          validator(termData.overview.weekendRates) >= 0 ||
          validator(termData.overview.holidayRates) >= 0,

        cancelOnClick: () => setStage('missionAndAbsence'),
        cancelTitle: 'Back',
      },
      component: Overview,
      progress: 2,
    },
  }

  const currentButtons = stagesMap[stage].buttons
  const CurrentComponent = stagesMap[stage].component

  useEffect(() => {
    getTermsReq({
      limit: tablesRowscounts.terms.templateOfTerms,
    }).then((data) => setTableData(formatters.table(data)))
  }, [])

  return (
    <main className={styles.contractSettings}>
      <FormLayout
        {...{
          className: styles.form,
          title: 'Add terms of contract templates',
          ...currentButtons,
        }}
      >
        <div className={styles.progressBar}>
          <div>
            <StepProgressBar
              current={stagesMap[stage].progress}
              steps={[
                { name: 'Overal' },
                { name: 'Mission and absence' },
                { name: 'Overview' },
              ]}
            />
          </div>
        </div>
        <CurrentComponent
          handleTermData={handleTermData}
          data={termData[stage]}
        />
      </FormLayout>
      <Table
        title="Template of terms"
        columns={tablesColumns.terms}
        size="large"
        rowsPerPage={tablesRowscounts.terms.templateOfTerms}
        rows={tableData.result}
        pages={tableData.total}
        formatter={formatters.table}
        withPagination
        queryFunction={getTermsReq}
      />
      <ContractModal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        data={modalData}
      />
    </main>
  )
}

export default ContractTerms
