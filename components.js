import NBtn from './src/components/btn'
import NExpansion from './src/components/expansion'
import NForm from './src/components/form'
import NGroupCheckbox from './src/components/group-checkbox'
import NInput from './src/components/input'
import NSelect from './src/components/select'
import NTable from './src/components/table'
import NTitle from './src/components/title'

export default class Components {
  static add (Vue) {
    Vue.component('NBtn', NBtn)
    Vue.component('NExpansion', NExpansion)
    Vue.component('NForm', NForm)
    Vue.component('NGroupCheckbox', NGroupCheckbox)
    Vue.component('NInput', NInput)
    Vue.component('NSelect', NSelect)
    Vue.component('NTable', NTable)
    Vue.component('NTitle', NTitle)
  }
}
