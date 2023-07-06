const isWorkingHourEditable = (time: number) => {
  // const date = new Date(time)
  //
  // return date.getFullYear() <= 2022 && date.getMonth() + 1 < 10
  return true
}

const refineToViewTime = (timeInMinutes: number, onlyPositive = false) => {
  const sign = Math.sign(timeInMinutes) < 0 ? '-' : '+'
  const absoluteMinutes = Math.abs(timeInMinutes)
  const hours = Math.floor(absoluteMinutes / 60)
  const minutes = Math.floor(absoluteMinutes % 60)

  if (onlyPositive && sign === '-') {
    return '0:00'
  }

  if (isNaN(hours) || isNaN(minutes)) {
    return '0:00'
  }

  return `${sign === '-' ? sign : ''}${hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`
}

export default {
  isWorkingHourEditable: (time) => isWorkingHourEditable(time),
  refineToViewTime,
}
