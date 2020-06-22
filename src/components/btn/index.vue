<script>
export default {
  name: 'NBtn',
  props: {
    label: { type: String, default: null },
    color: { type: String, default: 'primary' },
    outline: { type: Boolean, default: false }
  },
  methods: {
    click () { this.$emit('click') }
  }
}
</script>

<template>
  <div class="n-btn">
    <q-btn :label="label" :color="color" :outline="outline" unelevated @click="click"/>
  </div>
</template>

<style lang="stylus">
  .n-btn
    .q-btn
      width 100%
      padding 0 2rem
      letter-spacing .5px
      text-transform inherit
</style>
