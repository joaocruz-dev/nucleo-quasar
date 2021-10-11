import Vuelidate from 'vuelidate'
import Components from './src/components'
import { Api, Dark, Table, Utils, Validate, LoginToken, Msg, Alert } from './src/tools'

// Settigns options
let _options = {
  api: {},
  alert: {
    position: 'standard',
    style: { backgroundColor: 'var(--bg-light)', color: 'var(--text-light)' },
    ok: { color: 'primary', unelevated: true },
    cancel: { color: 'text-dark', outline: true }
  },
  delete: {
    position: 'left'
  }
}

class NucleoQuasar {
  static install (Vue, options = {}) {
    _options.api = {
      ..._options.api,
      ...options.api
    }
    _options.alert = {
      ..._options.alert,
      ...options.alert
    }
    _options.delete = {
      ..._options.alert,
      ..._options.delete,
      ...options.delete
    }

    Vue.prototype.$api = NucleoQuasar.Api
    Vue.prototype.$path = NucleoQuasar.path

    Vue.prototype.$Validate = Validate

    Vue.prototype.$Msg = Msg
    Vue.prototype.$Alert = NucleoQuasar.Alert
    Vue.prototype.$Delete = NucleoQuasar.Delete

    Vue.use(Vuelidate)
    Components.add(Vue)
  }

  static get Api () {
    const optionsApi = _options.api
    const host = process.env.NODE_ENV === 'development' ? optionsApi.hostDev : optionsApi.hostProd
    return new Api(host, optionsApi.unauthorizedFn)
  }

  static get path () {
    const optionsApi = _options.api
    return optionsApi.path || {}
  }

  static loginToken () {
    return LoginToken.login(_options.api.loginFn)
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

export default NucleoQuasar
export { NucleoQuasar, Api, Dark, Table, Utils, Msg }
