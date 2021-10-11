import NAction from './action'
import NAvatar from './avatar'
import NBtn from './btn'
import NCard from './card'
import NExpansion from './expansion'
import NForm from './form'
import NGroupCheckbox from './group-checkbox'
import NInput from './input'
import NList from './list'
import NPermissions from './permissions'
import NRadio from './radio'
import NRadioGroup from './radio-group'
import NSelect from './select'
import NStatus from './status'
import NTable from './table'
import NTitle from './title'

export default class Components {
  static add (Vue) {
    Vue.component('NAction', NAction)
    Vue.component('NAvatar', NAvatar)
    Vue.component('NBtn', NBtn)
    Vue.component('NCard', NCard)
    Vue.component('NExpansion', NExpansion)
    Vue.component('NForm', NForm)
    Vue.component('NGroupCheckbox', NGroupCheckbox)
    Vue.component('NInput', NInput)
    Vue.component('NList', NList)
    Vue.component('NPermissions', NPermissions)
    Vue.component('NRadio', NRadio)
    Vue.component('NRadioGroup', NRadioGroup)
    Vue.component('NSelect', NSelect)
    Vue.component('NStatus', NStatus)
    Vue.component('NTable', NTable)
    Vue.component('NTitle', NTitle)
  }
}
