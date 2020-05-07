<script>
import { UtilsDate } from '../../../utils'

export default {
  name: 'NInput',
  props: {
    value: { required: true },
    type: { type: String, default: 'text' },

    tooltip: { type: String, default: null },

    mask: { type: String, default: null },
    hint: { type: String, default: null },
    label: { type: String, default: null },
    autocomplete: { type: String, default: '' },

    dark: { type: Boolean, default: null },
    disable: { type: Boolean, default: false },
    autogrow: { type: Boolean, default: false },
    stackLabel: { type: Boolean, default: false },

    timeSeconds: { type: Boolean, default: false },
    optionsDate: { type: Function, default: (date) => { return true } },

    error: { default: false },
    vlidate: { default: null },
    errorMessage: { type: String, default: null }
  },
  data: () => ({
    isPwd: true,
    maskDate: 'DD/MM/YYYY'
  }),
  computed: {
    model: {
      get () {
        if (this.type === 'date') return this.value ? UtilsDate.dateToString(this.value, this.maskDate) : ''
        return this.value
      },
      set (val) {
        if (this.type === 'date') {
          val = val.length < this.maskDate.length ? null : UtilsDate.stringToString(val, this.maskDate)
          return this.$emit('input', val)
        }
        this.$emit('input', val)
      }
    },
    _type () {
      if (this.type === 'password') return this.isPwd ? 'password' : 'text'
      if (this.type === 'date') return 'tel'
      if (this.type === 'time') return 'tel'
      if (this.type === 'cpf') return 'tel'
      if (this.type === 'tel') return 'tel'
      if (this.type === 'cnpj') return 'tel'
      if (this.type === 'percentage') return 'number'
      return this.type
    },
    _mask () {
      if (this.mask) return this.mask
      if (this.type === 'date') return '##/##/####'
      if (this.type === 'cpf') return '###.###.###-##'
      if (this.type === 'tel') return '(##) #####-####'
      if (this.type === 'cnpj') return '##.###.###/####-##'
      return ''
    },
    _error () { return this.vlidate ? this.vlidate.$error : this.error },
    msgError () { return this._error ? this.errorMessage || this._error : '' }
  },
  methods: {
    blur () {
      if (this.vlidate) this.vlidate.$touch()
      this.$emit('blur')
    },
    keyup () { this.$emit('keyup') },
    enter () { this.$emit('enter') }
  }
}
</script>

<template>
  <div class="n-input">
    <q-input v-model="model" :label="label" :type="_type" :mask="_mask" :dark="dark" :autogrow="autogrow"
      :hint="hint" :stack-label="stackLabel" :autocomplete="autocomplete" :disable="disable" input-class=""
      :error="!!_error" :error-message="msgError"
      @blur="blur" @keyup="keyup" @keyup.enter="enter">

      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
          @click="isPwd = !isPwd" v-if="type == 'password'"/>

        <q-icon name="event" class="cursor-pointer" v-if="type == 'date'">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="model" :mask="maskDate" :options="optionsDate" @input="() => $refs.qDateProxy.hide()"/>
          </q-popup-proxy>
        </q-icon>

        <q-icon name="access_time" class="cursor-pointer" v-if="type == 'time'">
          <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
            <q-time v-model="model" format24h :with-seconds="timeSeconds"/>
          </q-popup-proxy>
        </q-icon>

        <div class="percentage" v-if="type == 'percentage'">
          %
        </div>

        <q-btn icon='help' flat round v-if="tooltip">
          <q-tooltip>{{ tooltip }}</q-tooltip>
        </q-btn>
      </template>

    </q-input>
  </div>
</template>

<style lang="stylus">
  .n-input
    padding-left 1rem
    padding-right 1rem
    margin-bottom .5rem
    .percentage
      font-size 2rem
      padding-top 1rem
      padding-right 2rem
</style>