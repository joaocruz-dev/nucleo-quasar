export default class UtilsObject {
  static advancedField (object, key) {
    const keys = key.split('.')
    let data = object[keys[0]]
    keys.shift()
    keys.forEach(key => { data = data[key] })
    return data
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

// export function advancedField (object, key) {
//   const keys = key.split('.')
//   let data = object[keys[0]]
//   keys.shift()
//   keys.forEach(key => { data = data[key] })
//   return data
// }

// export function extractInString (object) {
//   let string = ''
//   for (const key in object) {
//     const type = typeof object[key]
//     if (type === 'object') string += extractInString(object[key])
//     else string += String(object[key]).toLowerCase()
//   }
//   return string
// }

// export function sortObject (field) {
//   return (a, b) => {
//     a = advancedField(a, field)
//     b = advancedField(b, field)
//     return (a > b) ? 1 : ((b > a) ? -1 : 0)
//   }
// }
