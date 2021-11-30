import {
  BarChart,
  Bar as BarItem,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'

const Bar = ({ data, height, width }) => {
  return (
    <ResponsiveContainer height={height} width={width}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis width={30} padding={{ bottom: 6 }} />

        <BarItem dataKey="salary" barSize={44} radius={[0, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Bar
