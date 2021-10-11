<script>
const defaultOptions = () => [
  { value: true, label: 'Ativo', color: 'positive' },
  { value: false, label: 'Inativo', color: 'negative' }
]

export default {
  name: 'NStatus',
  props: {
    value: { required: true },
    options: { type: Array, default: defaultOptions }
  },
  computed: {
    model () {
      return this.options.find(option => option.value === this.value) || { label: '- - -', color: 'grey-5' }
    }
  }
}
</script>

<template>
  <div class="n-status">
    <q-badge :label="model.label" :color="model.color" :text-color="model.textColor || 'white'"/>
  </div>
</template>

<style lang="stylus">
  .n-status
    .q-badge
      padding .5rem 1rem
</style>
