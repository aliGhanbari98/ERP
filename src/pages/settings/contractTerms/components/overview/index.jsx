// components
import { Glyph, Headline } from '@liquid-design/liquid-design-react'
import { TextField } from 'base/form'
import { RateAdder } from 'base/ui'
// styles
import styles from './index.module.scss'

const Overview = ({ handleTermData, data }) => {
  return (
    <div className={styles.overview}>
      <div className={styles.title}>
        <Headline type="H3">Overtime</Headline>
        <Glyph size={16} name="tooltipFilled" />
      </div>
      <div className={styles.textfield}>
        <TextField
          placeholder="ex: 30"
          label="Monthly overtime limitaion (Hour)"
          value={data.max_overtime_allowed}
          onChange={(value) => handleTermData('max_overtime_allowed', value)}
        />
      </div>
      <div className={styles.info}>
        <Glyph size={24} name="tooltipFilled" />
        <span>
          The last value you enter is considered as limitation for each type of
          overtime.
        </span>
      </div>
      <div className={styles.rates}>
        <RateAdder
          title="Regular overtime"
          rates={data.regularRates}
          setRates={handleTermData}
          upperScopeKey="regularRates"
        />
        <RateAdder
          title="Weekend overtime"
          rates={data.weekendRates}
          setRates={handleTermData}
          upperScopeKey="weekendRates"
        />
        <RateAdder
          title="Holiday overtime"
          rates={data.holidayRates}
          setRates={handleTermData}
          upperScopeKey="holidayRates"
        />
      </div>
    </div>
  )
}

export default Overview
