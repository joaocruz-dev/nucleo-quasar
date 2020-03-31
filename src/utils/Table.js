export default class Table {
  constructor (
    modal = false,
    selected = null,
    selecteds = [],
    reload = false
  ) {
    this.modal = modal
    this.selected = selected
    this.selecteds = selecteds
    this.reload = reload
  }
}
