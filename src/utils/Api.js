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

  _error ({ response }, options, reject) {
    // Unauthorized function
    if (response && response.status === 403 && this._unauthorizedFn) {
      Loading.hide()
      return this._unauthorizedFn(response)
    }

    if (options.error === true) return reject(response)
    if (options.error === false) return console.error(response)

    if (!response) return Msg('Network Error', false)
    if (response.status === 404 && !response.data.message) return Msg('Not Found', false)

    if (response.data.message) return Msg(response.data.message, false)
    return Msg('Error without message', false)
  }

  _objectToQuery (query) {
    if (!query) query = {}
    const str = Object.keys(query).map(x => `${encodeURIComponent(x)}=${encodeURIComponent(query[x])}`).join('&')
    return str ? `?${str}` : ''
  }
}
