export default class UtilsDate {
  static dateToString (date, mask = 'YYYY-MM-DD') {
    date = new Date(date)
    if (date === 'Invalid Date') return ''
    let day = date.getUTCDate()
    day = day < 10 ? `0${day}` : day
    let month = date.getUTCMonth() + 1
    month = month < 10 ? `0${month}` : month
    const year = date.getUTCFullYear()

    mask = mask.replace('DD', day)
    mask = mask.replace('MM', month)
    mask = mask.replace('YYYY', year)
    return mask
  }

  static stringToString (string, mask = 'YYYY-MM-DD') {
    const dayIndex = mask.indexOf('DD')
    const monthIndex = mask.indexOf('MM')
    const yearIndex = mask.indexOf('YYYY')

    const day = string.substr(dayIndex, 2)
    const month = string.substr(monthIndex, 2)
    const year = string.substr(yearIndex, 4)

    const date = new Date(`${year}-${month}-${day}`)
    return date.toISOString()
  }

  static ruleDateAgo (date) {
    let nDate = new Date()
    let month = nDate.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    let day = nDate.getDate()
    day = day < 10 ? `0${day}` : day
    nDate = `${nDate.getFullYear()}/${month}/${day}`
    return date > nDate
  }
}
