import { useState } from 'react'
import { Headline, Paragraph } from '@liquid-design/liquid-design-react'
import { Dropdown } from 'base/form'
import { Card } from 'base/ui'
import { LineChart, PieChart, BarChart } from 'base/ui/charts'
import styles from './index.module.scss'

const AccountingCharts = ({
  type,
  pieData,
  filterData,
  lineData,
  barData,
  months,
}) => {
  const [activePie, setActivePie] = useState(null)
  return (
    <section className={styles.accountingCharts}>
      <Card className={styles.monthChart}>
        <div className={styles.header}>
          <Headline type="H2">Total salary per month</Headline>
        </div>

        <div className={styles.chart}>
          <LineChart data={lineData} width="100%" height={220} />
        </div>
      </Card>

      <Card className={styles.detailsChart}>
        <div className={styles.header}>
          <Headline type="H2">
            {`${
              type === 'admin'
                ? 'Teams monthly salary'
                : 'Monthly salary details'
            }`}
          </Headline>

          <Dropdown
            options={months}
            defaultItem={{ value: new Date().getMonth() + 1, key: 'value' }}
            onClick={(date) => filterData(date)}
          />
        </div>

        <div className={styles.chart}>
          {type === 'admin' ? (
            <BarChart data={barData} width="100%" height={220} />
          ) : (
            <>
              <PieChart
                data={pieData.data}
                label="Choose a section for further details"
                width={160}
                height={160}
                activeIndex={activePie}
                setActiveIndex={setActivePie}
              />

              <div className={styles.details}>
                <div className={styles.total}>
                  <Headline type="BH6">{pieData.selectedMonthSalary}</Headline>
                  <Paragraph type="xs">Monthly salary</Paragraph>
                </div>

                <div className={styles.items}>
                  {pieData.data.map(({ name, fill }, index) => (
                    <button
                      type="button"
                      key={`item-${name}`}
                      className={styles.item}
                      onClick={() =>
                        setActivePie((prevIndex) =>
                          prevIndex === index ? null : index
                        )
                      }
                    >
                      <span
                        className={styles.box}
                        style={{ background: fill }}
                      />
                      <Paragraph type="sm">{name}</Paragraph>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </section>
  )
}

export default AccountingCharts
