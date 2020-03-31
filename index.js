import { Api, Table, Scroll, validate, LoginToken, Msg, Alert } from './utils'

let api = null
let path = null
let loginToken = null
let alert = null
let delet = null

class NucleoQuasar {
  static install (Vue, options) {

    const optionsApi = options.api
    const server = process.env.NODE_ENV === 'development' ? optionsApi.hostDev : optionsApi.hostProd
    api = new Api(server, optionsApi.notFoundFn, optionsApi.unauthorizedFn)
    Vue.prototype.$api = api
    path = optionsApi.path
    Vue.prototype.$path = path

    Vue.prototype.$Scroll = Scroll

    Vue.prototype.$validate = validate

    loginToken = new LoginToken(optionsApi.loginFn)

    Vue.prototype.$Msg = Msg

    const optionsAlert = options.alert
    alert = (title, message, options = {}) => {
      options = {
        ...optionsAlert,
        ...options
      }
      return Alert(title, message, options)
    }
    Vue.prototype.$Alert = alert

    const optionsDelete = options.delete
    delet = (name, controller, data) => {
      return new Promise((resolve, reject) => {
        const message = name || 'o item selecionado'
        alert('Excluir', `Tem certeza que deseja excluir ${message}?`, optionsDelete)
          .onOk(() => {
            api.delete(controller, data)
              .then(data => resolve(data))
          })
      })
    }
    Vue.prototype.$Delete = delet
  }
}

export { NucleoQuasar, api, path, Table, Scroll, loginToken, Msg, alert, delet }
