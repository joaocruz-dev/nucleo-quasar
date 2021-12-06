<script>
export default {
  name: 'NBtn',
  props: {
    label: { type: String, required: true },

    icon: { type: String, default: void 0 },
    disable: { type: Boolean, default: false },
    color: { type: String, default: 'text-dark' }
  },
  methods: {
    clickFn () { this.$emit('click') }
  }
}
</script>

<template>
  <div class="n-btn">
    <q-btn :label="label" :icon-right="icon" :color="color" flat :disable="disable" @click="clickFn">
      <slot></slot>
    </q-btn>
  </div>
</template>

<style lang="stylus">
  .n-btn
    .q-btn
      width 100%
      min-width 100px
      text-transform inherit
      border 1px solid $accent
</style>
