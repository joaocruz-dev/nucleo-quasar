<script>
export default {
  name: 'NAvatar',
  props: {
    src: { type: String, default: null },
    icon: { type: String, default: 'o_person' }
  },
  methods: {
    clickFn () { this.$emit('click') }
  }
}
</script>

<template>
  <div class="n-avatar row flex-center">
    <img class="img" :src="src" v-if="src">
    <q-icon :name="icon" v-else/>
  </div>
</template>

<style lang="stylus">
  .n-avatar
    width 80px
    height 80px
    overflow hidden
    border-radius 100%
    background-color var(--bg-dark)
    .img
      width 100%
    .q-icon
      font-size 4.5rem
</style>
