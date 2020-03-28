# nucleo-quasar

> Base configurations for Quasar projects

## Installation

```bash
npm install nucleo-quasar --save
```

```bash
yarn add nucleo-quasar
```

You can import the library and use as a Vue plugin to enable the functionality globally on all components.

```javascript
import Vue from 'vue'
import { NucleoQuasar, Msg } from 'nucleo-quasar'

Vue.use(NucleoQuasar, options)
```

## Configuration Options

These are the configuration options for everything to work.

```javascript
{
  api: {
    // `hostDev` is the URL of the server that will be used for requests in development mode
    hostDev: 'http://localhost:3000/api',
    // `hostProd` is the URL of the server that will be used for requests in production mode
    hostProd: 'https://api.maisdiarias.com/api',
    // `path` is a complementary path for requests
    path: {
      // site
      site: '/site',
      status: '/status'
    },
    // Function to be called when a request responds with 404 status
    // this is optional
    notFoundFn () {
      Msg('Rota indisponível', false)
    },
    // Function to be called when a request responds with 401 status
    // this is optional
    unauthorizedFn () {
      Msg('Acesso expirado', false)
    },
    // Function to be called by LoginToken
    // this is optional
    loginFn (resolve, reject, token) {
      console.log('loginFn', token)
    }
  },
  // Options of the Quasar Dialog used in Alert
  alert: {
    position: 'left',
    style: { backgroundColor: '#F0f0f0', color: '#404040' },
    ok: { textColor: 'white', color: 'accent' },
    cancel: { textColor: 'white', color: 'negative' }
  },
  // Options of the Quasar Dialog used in Delete
  // what not to change will be used as an `alert`
  delete: {}
}
```

## nucleo-quasar API

Request methods allowed.

##### api.get(path, options)
##### api.post(path, data, options)
##### api.put(path, data, options)
##### api.delete(path, data, options)

### Methods Options

```javascript
{
  // Set to 'true', the Authorization header will be inserted
  token: true,
  // Set to 'null' a 'response.data.message' message will be displayed using Msg
  // Set to 'true' will be returned reject on Promise
  // Set to 'false' console.error will be returned
  error: null,
  // Set to 'true', Quasar Loading will be used
  loading: true
}
```
