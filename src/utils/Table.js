import { UtilsObject } from '../../utils'

export default class Table {
  constructor (
    data = [],
    modal = false,
    reload = false,
    selected = null,
    selecteds = null
  ) {
    this.data = data
    this.modal = modal
    this.reload = reload
    this.selected = selected
    this.selecteds = selecteds
  }

  static searchText (array, text) {
    return array.filter(data => {
      const string = UtilsObject.extractInString(data)
      const index = string.indexOf(text.toLowerCase())
      return index > -1
    })
  }
}
