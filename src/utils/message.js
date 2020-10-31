import { Notify, Dialog } from 'quasar'

export const Msg = (message = null, type = true, opt = {}) => {
  if (!message) message = type ? 'Sucesso' : 'Erro'
  const settings = {
    message,
    timeout: type ? 3000 : 5000,
    icon: type ? 'check_circle' : 'warning',
    color: type ? 'positive' : 'negative',
    ...opt
  }
  return Notify.create(settings)
}

export const Alert = (title, message, options = {}) => {
  return Dialog.create({
    title,
    message,
    html: true,
    persistent: false,
    ...options
  })
}
