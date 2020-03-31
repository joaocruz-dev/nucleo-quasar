import { LocalStorage } from 'quasar'

export default class LoginToken {
  constructor (loginFn) {
    this.loginFn = loginFn
  }

  get token () { return LocalStorage.getItem('token') || false }

  login () {
    return new Promise((resolve, reject) => {
      if (!this.token) return
      this.loginFn(resolve, reject, this.token)
    })
  }
}
