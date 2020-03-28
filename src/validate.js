import * as validators from 'vuelidate/lib/validators'

export default (rules) => {
  const validate = {}
  rules.forEach(rule => {
    const rules = {}
    const arrayRules = rule.rules.split('|')
    arrayRules.forEach(r => {
      const value = r.split(':')
      if (value.length === 1) {
        rules[value[0]] = validators[value[0]]
      } else {
        rules[value[0]] = validators[value[0]](value[1])
      }
    })
    validate[rule.field] = rules
  })
  return validate
}
