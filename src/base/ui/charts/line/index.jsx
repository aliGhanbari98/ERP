import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line as LineItem,
  XAxis,
  YAxis,
} from 'recharts'

const Line = ({ data, height, width }) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis width={30} />

        <LineItem
          type="monotoneX"
          stroke="#2dbecd"
          strokeWidth={2}
          dot={{ fill: '#2dbecd' }}
          dataKey="salary"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Line
