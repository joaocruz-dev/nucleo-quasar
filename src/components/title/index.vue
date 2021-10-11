<script>
export default {
  name: 'NTitle',
  props: {
    label: { Type: String, required: true }
  }
}
</script>

<template>
  <div class="n-title">
    <h1 class="title">{{ label }}</h1>
  </div>
</template>

<style lang="stylus">
  .n-title
    width 100%
    padding 2rem 3rem
    border-bottom .3rem solid var(--bg-dark)
    .title
      font-weight 400
      line-height 4rem
      font-size 2.5rem
      color var(--text-light)
      text-transform uppercase
</style>
