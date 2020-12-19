<script>
import { colors } from 'quasar'

export default {
  name: 'NRadio',
  props: {
    val: { required: true },
    value: { required: true },

    icon: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, default: 'primary' }
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    },
    isActive () { return this.model === this.val },
    hexColor () { return colors.getPaletteColor(this.color) }
  },
  methods: {
    setValueFn () {
      this.model = this.val
    }
  }
}
</script>

<template>
  <div class="n-radio" @click="setValueFn">
    <div
      :class="`container ${isActive ? `text-white bg-${color}` : `text-${color}`} row flex-center`"
      :style="`border: 2px solid ${hexColor};`"
    >
      <q-icon :name="icon"/>
      <h1 class="label col-8">{{label}}</h1>
    </div>
  </div>
</template>

<style lang="stylus">
  .n-radio
    padding 1rem
    min-width 150px
    max-width 250px
    .container
      width 100%
      height 100%
      padding 2rem
      cursor pointer
      border-radius 5px
      background-color transparent
      .q-icon
        font-size 5rem
        margin-bottom 1rem
      .label
        margin 0
        width 100%
        font-size 2rem
        font-weight 500
        line-height 2rem
        text-align center
</style>
