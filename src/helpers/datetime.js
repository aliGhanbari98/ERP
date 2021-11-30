export const calculateDates = (dateFuture, dateNow) => {
  const seconds = Math.floor((dateFuture - dateNow) / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  hours -= days * 24
  minutes = minutes - days * 24 * 60 - hours * 60

  const total = `${days ? `${days}d ` : ''}${
    hours > 0 || minutes > 0
      ? `${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}`
      : '00:00'
  }`

  return { days, hours, minutes, total }
}

export const UTCToTime = (date) => {
  const newDate = new Date(date)
  return `${newDate.getHours()}:${newDate.getMinutes()}`
}

export const UTCToDate = (date) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}

export const secondsToTime = (secs, type = 'string') => {
  const hours = Math.floor(secs / (60 * 60))

  const divisorForMinutes = secs % (60 * 60)
  const minutes = Math.floor(divisorForMinutes / 60)

  const divisorForSeconds = divisorForMinutes % 60
  const seconds = Math.ceil(divisorForSeconds)

  let results = { hours, minutes, seconds }

  switch (type) {
    case 'string':
      results = `${hours}h, ${
        minutes !== 0 ? `${`0${minutes}`.slice(-2)}m` : '00'
      }`
      break
    case 'time':
      results = `${hours}:${`0${minutes}`.slice(-2)}`
      break

    case 'seperate':
      results = `${hours ? `${hours}h` : ''}${minutes ? ` ${minutes}m` : ''}`
      break

    default:
      break
  }

  return results
}

export default calculateDates
