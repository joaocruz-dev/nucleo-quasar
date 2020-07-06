<script>
import { UtilsObject } from '../../../utils'

export default {
  name: 'NSelect',
  props: {
    value: { required: true },
    type: { type: String, default: null }, // status || yesOrNo
    label: { type: String, default: null },

    options: { type: Array, default: null },
    controller: { type: String, default: null },

    optionLabel: { type: [String, Function], default: 'label' },
    optionValue: { type: [String, Function], default: 'value' },

    dark: { type: Boolean, default: null },
    dense: { type: Boolean, default: null },
    clear: { type: Boolean, default: false },
    filled: { type: Boolean, default: null },
    filter: { type: Boolean, default: false },
    rounded: { type: Boolean, default: null },
    disable: { type: Boolean, default: false },
    standout: { type: Boolean, default: null },
    multiple: { type: Boolean, default: false },
    fullValue: { type: Boolean, default: false },

    error: { default: false },
    vlidate: { default: null },
    errorMessage: { type: String, default: null }
  },
  data: () => ({
    list: [],
    search: '',
    update: false
  }),
  created () {
    this.updateFn()
    this.typeOptions()
  },
  computed: {
    model: {
      get () {
        let value = this.value
        if (this.multiple) {
          value = Array.isArray(value) ? value : []
          if (this.fullValue) value = value.map(value => this.valueFn(value))
          return this._options.filter(obj => value.find(value => value === obj.value))
        }
        if (value && this.fullValue) value = this.valueFn(value)
        return this._options.find(obj => obj.value === value)
      },
      set (val) {
        if (this.multiple) {
          val = (Array.isArray(val) ? val : []).map(val => val.value)
          if (this.fullValue) val = val.map(val => this._list.find(obj => this.valueFn(obj) === val))
          return this.$emit('input', val)
        }
        val = val ? val.value : val
        if (val && this.fullValue) val = this._list.find(obj => this.valueFn(obj) === val)
        this.$emit('input', val)
      }
    },
    _list () {
      return this.options || this.list
    },
    _options () {
      let options = this._list.map(obj => ({ label: this.labelFn(obj), value: this.valueFn(obj) }))
      if (this.search) options = options.filter(p => p.label.toLowerCase().indexOf(this.search) > -1)
      return options
    },
    _error () { return this.vlidate ? this.vlidate.$error : this.error },
    msgError () { return this._error ? this.errorMessage || this._error : '' }
  },
  methods: {
    updateFn () {
      if (!this.controller) return
      this.update = true
      this.$api.get(this.controller, { loading: false })
        .then(data => {
          this.list = data
          this.update = false
          this.$emit('get', data)
        })
    },
    typeOptions () {
      if (this.type === 'status') this.list = [{ label: 'Ativo', value: true }, { label: 'Inativo', value: false }]
      else if (this.type === 'yesOrNo') this.list = [{ label: 'Sim', value: true }, { label: 'Não', value: false }]
    },
    labelFn (obj) { return this.getOptionStringFn(obj, this.optionLabel) },
    valueFn (obj) { return this.getOptionStringFn(obj, this.optionValue) },
    getOptionStringFn (obj, key) {
      if (typeof key === 'string') return UtilsObject.advancedField(obj, key)
      if (typeof key === 'function') return key(obj)
    },
    blurFn () {
      if (this.vlidate) this.vlidate.$touch()
      this.$emit('blur')
    },
    filterFn (val, update) {
      val = val.toLowerCase()
      update(() => {
        this.search = val
      })
    }
  },
  watch: {
    type () { this.typeOptions() },
    controller () { this.updateFn() }
  }
}
</script>

<template>
  <div class="n-select">
    <q-select v-model="model" :label="label" :options="_options" :loading="update" :multiple="multiple" :dark="dark"
      :use-chips="multiple" :dense="dense" :filled="filled" :rounded="rounded" :standout="standout" :disable="disable"
      :use-input="filter" :input-debounce="300"
      :error="!!_error" :error-message="msgError"
      @blur="blurFn" @filter="filterFn">

      <template #no-option>
        <q-item>
          <q-item-section class="text-grey">
            Sem registros
          </q-item-section>
        </q-item>
      </template>

      <template #append>
        <q-icon name="close" class="cursor-pointer" @click="model = null" v-if="clear"/>
        <slot name="append"></slot>
      </template>

      <template #after>
        <slot name="after"></slot>
      </template>

   </q-select>
  </div>
</template>

<style lang="stylus">
  .n-select
    padding-left 1rem
    padding-right 1rem
</style>
