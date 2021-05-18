export function stringToDate(fmt) {
  return new Date(fmt)
}

function filter(val) {
  return val < 10 ? '0' + val : val
}

export function dateToString(date) {
  let year = date.getFullYear()
  let month = filter(date.getMonth() + 1)
  let day = filter(date.getDate())
  let hour = filter(date.getHours())
  let min = filter(date.getMinutes())
  return year + "/" + month + '/' + day + " " + hour + ":" + min
}

