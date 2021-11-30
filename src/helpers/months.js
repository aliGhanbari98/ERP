const months = Array.from({ length: 12 }, (_, i) => {
  const nowDate = new Date()
  const month = new Date(nowDate.getFullYear(), i, 1)
  const to = new Date(nowDate.getFullYear(), i + 1, 0)

  return {
    name: month.toLocaleString('en-US', { month: 'long' }),
    value: month.toLocaleString('en-US', { month: 'numeric' }),
    from: month,
    to,
  }
})

export default months
