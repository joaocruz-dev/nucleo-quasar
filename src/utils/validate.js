import * as validators from 'vuelidate/lib/validators'

const messages = {
  url: () => { return 'URL inválido.' },
  cpf: () => { return 'CPF inválido.' },
  cnpj: () => { return 'CNPJ inválido.' },
  date: () => { return 'Data inválida.' },
  email: () => { return 'E-mail inválido.' },
  phone: () => { return 'Celular inválido.' },
  default: () => { return 'Campo inválido.' },
  ip: () => { return 'Endereço IP inválido.' },
  required: () => { return 'O campo é obrigatório.' },
  alpha: () => { return 'O campo deve conter somente letras.' },
  format: (e) => { return `O campo deve estar no formato ${e}.` },
  numeric: () => { return 'O campo deve conter somente números.' },
  max: (e) => { return `O campo não deve ter mais que ${e} caracteres.` },
  min: (e) => { return `O campo deve conter pelo menos ${e} caracteres.` },
  alpha_num: () => { return 'O campo deve conter somente letras e números.' },
  max_value: (e) => { return `O campo precisar ter ${e} ou menos caracteres.` },
  min_value: (e) => { return `O campo precisar conter ${e} ou mais caracteres.` },
  digits: (e) => { return `O campo deve ser numérico e ter exatamente ${e} dígitos.` },
  alpha_dash: () => { return 'O campo deve conter somente letras, números e traços.' },
  alpha_spaces: () => { return 'O campo deve conter caracteres alfabéticos e espaços.' },
  length: (e, n) => { return n ? `O campo deve ter entre ${e} e ${n} caracteres.` : `O campo deve ter ${e} caracteres.` }
}

export default class Validate {
  static rules (rules) {
    const validate = {}
    rules.forEach(rule => {
      const rules = {}
      const arrayRules = rule.rules.split('|')
      arrayRules.forEach(r => {
        const value = r.split(':')
        rules[value[0]] = value.length === 1 ? validators[value[0]] : validators[value[0]](value[1])
      })
      validate[rule.field] = rules
    })
    return validate
  }

  static message (name, ...options) {
    return messages[name](...options)
  }
}
