import { Api, Dark, Table, Scroll, Validate, UtilsDate, LoginToken, Msg, Alert, UtilsObject } from './utils'
import Components from './components'
import Vuelidate from 'vuelidate'

// Settigns options
let _options = {
  api: {},
  alert: {},
  delete: {}
}

class NucleoQuasar {
  static install (Vue, options = {}) {
    _options = {
      ..._options,
      ...options
    }

    Vue.prototype.$api = NucleoQuasar.Api
    Vue.prototype.$path = NucleoQuasar.path

    Vue.prototype.$Scroll = Scroll
    Vue.prototype.$Validate = Validate

    Vue.prototype.$Msg = Msg
    Vue.prototype.$Alert = NucleoQuasar.Alert
    Vue.prototype.$Delete = NucleoQuasar.Delete

    Vue.use(Vuelidate)
    // Vue.mixin({
    //   created () {
    //     this.$options.validateRules = Vue.observable({})
    //   }
    // })
    // Vue.directive('validate', (el, binding, vnode) => {
    //   const expression = vnode.data.model.expression.split('.')
    //   let validateRules = vnode.context.$options.validateRules
    //   expression.forEach((key, i) => {
    //     if (expression.length === (i + 1)) {
    //       validateRules[key] = binding.value
    //       return
    //     }
    //     if (validateRules[key]) validateRules = validateRules[key]
    //     else {
    //       validateRules[key] = {}
    //       validateRules = validateRules[key]
    //     }
    //   })
    // })

    Components.add(Vue)
  }

  static get Api () {
    const optionsApi = _options.api
    const host = process.env.NODE_ENV === 'development' ? optionsApi.hostDev : optionsApi.hostProd
    return new Api(host, optionsApi.notFoundFn, optionsApi.unauthorizedFn)
  }

  static get path () {
    const optionsApi = _options.api
    return optionsApi.path || {}
  }

  static get LoginToken () {
    const optionsApi = _options.api
    return new LoginToken(optionsApi.loginFn)
  }

  static Alert (title, message, options = {}) {
    const optionsAlert = _options.alert
    options = {
      ...optionsAlert,
      ...options
    }
    return Alert(title, message, options)
  }

  static Delete (name, controller, data) {
    const optionsDelete = _options.delete
    return new Promise((resolve, reject) => {
      const message = name || 'o item selecionado'
      NucleoQuasar.Alert('Excluir', `Tem certeza que deseja excluir ${message}?`, optionsDelete)
        .onOk(() => {
          NucleoQuasar.Api.delete(controller, data)
            .then(data => resolve(data))
        })
    })
  }
}

export { NucleoQuasar, Dark, Table, Scroll, UtilsDate, Msg, UtilsObject }
export default NucleoQuasar
