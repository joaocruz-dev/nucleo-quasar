<script>
import { colors } from 'quasar'

export default {
  name: 'NRadio',
  props: {
    val: { required: true },
    value: { required: true },

    icon: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, default: 'primary' },

    disable: { type: Boolean, default: false }
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    },
    isActive () { return this.model === this.val },

    _color () { return this.disable ? 'negative' : this.color },
    hexColor () { return colors.getPaletteColor(this._color) }
  },
  methods: {
    setValueFn () {
      if (this.disable) return
      this.model = this.val
    }
  }
}
</script>

<template>
  <div class="n-radio" @click="setValueFn">
    <div :style="`border: 2px solid ${hexColor};`"
      :class="`container ${isActive ? `text-white bg-${_color}` : `text-${_color}`} ${disable ? 'disable' : ''} row flex-center`">
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
    .disable
      cursor not-allowed
</style>
