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
    <div :class="`status row flex-center text-${model.color}`">
      <span class="focus"/>
      <q-icon :name="model.icon" v-if="model.icon"/>
      <span class="label">{{model.label}}</span>
    </div>
  </div>
</template>

<style lang="stylus">
  .n-status
    font-size 1.4rem
    .status
      overflow hidden
      padding 3px 1rem
      position relative
      border-radius 1rem
      display inline-block
      .focus
        top 0
        left 0
        width 100%
        height 100%
        opacity .15
        position absolute
        background currentColor
      .q-icon
        padding-right 2px
</style>
