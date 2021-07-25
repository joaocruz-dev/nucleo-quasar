import { LocalStorage } from 'quasar'

export default class LoginToken {
  static login (loginFn) {
    return new Promise((resolve, reject) => {
      loginFn(LocalStorage.getItem('token') || false, resolve, reject)
    })
  }
}
