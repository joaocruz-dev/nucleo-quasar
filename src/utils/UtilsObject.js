export default class UtilsObject {
  static advancedField (object, key) {
    const keys = key.split('.')
    return keys.reduce((acc, x) => acc[x], object)
  }

  static extractInString (object) {
    let string = ''
    for (const key in object) {
      const type = typeof object[key]
      if (type === 'object') string += UtilsObject.extractInString(object[key])
      else string += String(object[key]).toLowerCase()
    }
    return string
  }

  static sortObject (field) {
    return (a, b) => {
      a = UtilsObject.advancedField(a, field)
      b = UtilsObject.advancedField(b, field)
      return (a > b) ? 1 : ((b > a) ? -1 : 0)
    }
  }
}
