import { Headline } from '@liquid-design/liquid-design-react'
import { PieChart, Pie as PieItem, Cell, Sector, Label } from 'recharts'
import styles from './index.module.scss'

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    stroke,
  } = props

  return (
    <Sector
      className={styles.active}
      cx={cx - 1}
      cy={cy + 1}
      innerRadius={innerRadius - 7}
      outerRadius={outerRadius}
      cornerRadius={100}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={stroke}
    />
  )
}

const Pie = ({ data, label, width, height, activeIndex, setActiveIndex }) => {
  const handlePieClick = (_, index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <PieChart className={styles.pieChart} width={width} height={height}>
      <PieItem
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        dataKey="value"
        innerRadius={60}
        outerRadius={75}
        cornerRadius={100}
        paddingAngle={-20}
        startAngle={180}
        endAngle={-180}
        blendStroke
        onMouseDown={handlePieClick}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} />
        ))}
        <Label
          width={50}
          position="center"
          content={() => {
            return (
              <g>
                <foreignObject
                  x={30}
                  y={30}
                  offset={5}
                  width={100}
                  height={100}
                >
                  <div
                    className={`${styles.chartLabel} ${
                      activeIndex !== null ? styles.labelActive : ''
                    }`}
                  >
                    {activeIndex !== null ? (
                      <Headline type="BH5">
                        {data[activeIndex] && data[activeIndex].value}
                      </Headline>
                    ) : (
                      label
                    )}
                  </div>
                </foreignObject>
              </g>
            )
          }}
        />
      </PieItem>
    </PieChart>
  )
}

export default Pie
