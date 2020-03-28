import { Loading, LocalStorage } from 'quasar'
import axios from 'axios'
import { Msg } from './mensagem'

export default class Api {
  constructor (host, notFound, unauthorized) {
    this.host = host
    this.notFoundFn = notFound
    this.unauthorizedFn = unauthorized
    this.defaultOptions = {
      token: true,
      error: null,
      loading: true
    }
  }

  createClient (options) {
    axios.defaults.baseURL = this.host
    axios.defaults.headers['Content-Type'] = 'application/json'
    if (options.token) axios.defaults.headers.common.Authorization = `Bearer ${LocalStorage.getItem('token')}`
    else if (axios.defaults.headers.common.Authorization) delete axios.defaults.headers.common.Authorization
    axios.create({
      baseURL: this.host
    })
  }

  start (request, options) {
    options = {
      ...this.defaultOptions,
      ...options
    }
    if (options.loading) Loading.show()
    this.createClient(this.host, options)
    return new Promise((resolve, reject) => request(resolve, reject, options))
  }

  end (options) {
    if (options.loading) Loading.hide()
  }

  connectionRefused () {
    Loading.hide()
    Msg('Network Error', false)
  }

  notFound () {
    Loading.hide()
    if (this.notFoundFn) this.notFoundFn()
  }

  unauthorized () {
    Loading.hide()
    if (this.unauthorizedFn) this.unauthorizedFn()
  }

  error (err, options, reject) {
    if (!err.response) return this.connectionRefused()
    if (err.response.status === 404) return this.notFound()
    if (err.response.status === 401) return this.unauthorized()

    if (options.error === null) return Msg(err.response.data.message, false)
    if (options.error) return reject(err.response)
    console.error(err)
  }

  get (path, options = {}) {
    const request = (resolve, reject, options) => {
      axios.get(path)
        .then(resp => resolve(resp.data))
        .catch(err => this.error(err, options, reject))
        .finally(() => this.end(options))
    }
    return this.start(request, options)
  }

  post (path, data, options = {}) {
    const request = (resolve, reject, options) => {
      axios.post(path, data)
        .then(resp => resolve(resp.data))
        .catch(err => this.error(err, options, reject))
        .finally(() => this.end(options))
    }
    return this.start(request, options)
  }

  put (path, data, options = {}) {
    const request = (resolve, reject, options) => {
      axios.put(path, data)
        .then(resp => resolve(resp.data))
        .catch(err => this.error(err, options, reject))
        .finally(() => this.end(options))
    }
    return this.start(request, options)
  }

  delete (path, data, options = {}) {
    const request = (resolve, reject, options) => {
      axios.delete(path, { data })
        .then(resp => resolve(resp.data))
        .catch(err => this.error(err, options, reject))
        .finally(() => this.end(options))
    }
    return this.start(request, options)
  }
}
