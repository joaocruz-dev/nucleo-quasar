import { Api, Scroll, validate, LoginToken, Msg, Alert } from './utils'

let api = null
let loginToken = null
let alert = null
let delet = null

class NucleoQuasar {
  static install (Vue, options) {

    const optionsApi = options.api
    const server = process.env.NODE_ENV === 'development' ? optionsApi.hostDev : optionsApi.hostProd
    api = new Api(server, optionsApi.notFoundFn, optionsApi.unauthorizedFn)
    Vue.prototype.$api = api
    Vue.prototype.$path = optionsApi.path

    Vue.prototype.$Scroll = Scroll

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

export { NucleoQuasar, api, Scroll, validate, loginToken, Msg, alert, delet }
