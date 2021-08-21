import axios from 'axios'
import { Loading, LocalStorage } from 'quasar'

import { Msg } from './message'

export default class Api {
  constructor (baseURL, unauthorizedFn) {
    this._baseURL = baseURL
    this._unauthorizedFn = unauthorizedFn
    this._options = {
      token: true,
      error: null,
      query: null,
      loading: true,
      response: false
    }
  }

  get (path, options) {
    return this._client('GET', path, null, options)
  }

  post (path, data, options) {
    return this._client('POST', path, data, options)
  }

  put (path, data, options) {
    return this._client('PUT', path, data, options)
  }

  delete (path, data, options) {
    return this._client('DELETE', path, data, options)
  }

  _client (method, path, data, options) {
    if (!path) path = ''
    if (!options) options = {}
    options = { ...this._options, ...options }

    if (options.loading) Loading.show()
    path += this._objectToQuery(options.query)

    return this._request(options, (api, resolve, reject) => {
      api.request({ method, url: path, data })
        .then(res => resolve(options.response ? res : res.data))
        .catch(error => this._error(error, options, reject))
        .finally(() => {
          if (options.loading) Loading.hide()
        })
    })
  }

  _request (options, request) {
    const api = axios.create({
      baseURL: this._baseURL,
      headers: { 'Content-Type': 'application/json' }
    })
    if (options.token) api.defaults.headers.Authorization = `Bearer ${LocalStorage.getItem('token')}`
    return new Promise((resolve, reject) => request(api, resolve, reject))
  }

  _error (error, options, reject) {
    error = error.response || error

    // Unauthorized function
    if (error && error.status === 403 && this._unauthorizedFn) {
      Loading.hide()
      return this._unauthorizedFn(error)
    }

    if (options.error === true) return reject(error)
    if (options.error === false) return console.error(error)

    if (!error) return Msg('Network Error', false)
    if (error.status === 404 && !error.data.message) return Msg('Not Found', false)

    if (error.data.message) return Msg(error.data.message, false)
    return Msg('Error without message', false)
  }

  _objectToQuery (query) {
    if (!query) query = {}
    const str = Object.keys(query).map(x => `${encodeURIComponent(x)}=${encodeURIComponent(query[x])}`).join('&')
    return str ? `?${str}` : ''
  }
}
