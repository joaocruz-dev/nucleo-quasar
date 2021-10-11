import { date } from 'quasar'

export default class Utils {
  static sortObject (key) {
    return (a, b) => {
      a = Utils.getObjectValue(key, a)
      b = Utils.getObjectValue(key, b)
      return (a > b) ? 1 : ((b > a) ? -1 : 0)
    }
  }

  static getObjectValue (key, object) {
    const keys = key.split('.')
    return keys.reduce((acc, x) => acc[x], object)
  }

  static formatDateBR (time) {
    return date.formatDate(time, 'DD/MM/YYYY')
  }

  static formatTimeBR (time) {
    return date.formatDate(time, 'DD/MM/YYYY HH:mm') + 'h'
  }
}
