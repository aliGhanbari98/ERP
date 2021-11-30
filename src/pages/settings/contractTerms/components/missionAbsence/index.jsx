// components
import { RateAdder } from 'base/ui'
// styles
import styles from './index.module.scss'

const MissionAndAbsemce = ({ handleTermData, data }) => {
  return (
    <div className={styles.overal}>
      <RateAdder
        title="Absence"
        titleDesc="There is no limitation for absence"
        info="If you consider the rate to be 0, the amount of absence will not be applied in salary."
        rates={data.absenceRates}
        setRates={handleTermData}
        upperScopeKey="absenceRates"
      />
      <RateAdder
        title="Mission"
        titleDesc="There is no limitation for mission"
        info="If you consider the rate to be 0, the amount of mission will not be applied in salary."
        rates={data.missionRates}
        setRates={handleTermData}
        upperScopeKey="missionRates"
      />
    </div>
  )
}

export default MissionAndAbsemce
