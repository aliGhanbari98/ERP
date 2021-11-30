/* eslint-disable camelcase */
// components
import { TextField, Button } from 'base/form'
import { Glyph, Headline } from '@liquid-design/liquid-design-react'
// styles
import styles from './index.module.scss'

const Item = ({ max_second, min_second, rate, onChange, onDelete, id }) => (
  <div className={styles.item}>
    <TextField
      value={min_second}
      onChange={(value) =>
        onChange({ key: 'min_second', id, value: Number(value) })
      }
      label="From"
    />
    <TextField
      value={max_second}
      onChange={(value) =>
        onChange({ key: 'max_second', id, value: Number(value) })
      }
      label="To"
    />
    <TextField
      value={rate}
      onChange={(value) => onChange({ key: 'rate', id, value: Number(value) })}
      label="Rate"
    />
    {onDelete && (
      <Glyph
        size={26}
        name="add"
        color="primary.light"
        onClick={() => onDelete(id)}
      />
    )}
  </div>
)

const validator = ({ max_second, min_second, rate }) =>
  typeof max_second !== 'number' ||
  typeof min_second !== 'number' ||
  typeof rate !== 'number'

const RateAdder = ({
  title,
  titleDesc,
  info,
  rates,
  setRates,
  upperScopeKey,
}) => {
  const handleStateChange = ({ key, id, value }) =>
    setRates(
      upperScopeKey,
      rates.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    )

  const deleteRate = (id) =>
    setRates(
      upperScopeKey,
      rates.filter((item) => item.id !== id)
    )

  const addRate = () =>
    setRates(upperScopeKey, [
      ...rates,
      {
        id: Date.now(),
      },
    ])

  return (
    <div className={styles.rateAdder}>
      <div className={styles.title}>
        <Headline type="H3" color="secondary">
          {title}
        </Headline>
        {titleDesc && <span>{`(${titleDesc})`}</span>}
      </div>
      {info && (
        <div className={styles.info}>
          <Glyph size={24} name="tooltipFilled" />
          <span>{info}</span>
        </div>
      )}
      <div className={styles.items}>
        <Item {...{ ...rates[0], onChange: handleStateChange }} />
        {rates.slice(1).map((item) => (
          <Item
            {...{ ...item, onChange: handleStateChange, onDelete: deleteRate }}
          />
        ))}
        <div className={styles.addRateButton}>
          <Button
            disabled={validator(rates[rates.length - 1])}
            onClick={addRate}
          >
            Add rate
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RateAdder
