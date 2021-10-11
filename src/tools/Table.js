export default class Table {
  constructor (
    data = [],
    modal = false,
    reload = false,
    selected = null,
    selecteds = []
  ) {
    this.data = data
    this.modal = modal
    this.reload = reload
    this.selected = selected
    this.selecteds = selecteds
  }

  static filterOfText (array, text) {
    text = text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    const regExp = new RegExp(text, 'i')
    return array.filter(data => {
      data = JSON.stringify(data).replace(/"[a-zA-Z0-9_-]*":/gi, '')
      return regExp.test(data)
    })
  }
}
