<script>
export default {
  name: 'NCard',
  props: {
    icon: { type: String, default: void 0 },
    title: { type: String, required: true },

    row: { type: Boolean, default: false }
  }
}
</script>

<template>
  <div class="n-card">
    <div class="n-card_container">

      <div class="n-card_header row justify-between items-center">
        <div class="row items-center">
          <q-icon :name="icon" style="margin-right: 1.3rem;" v-if="icon"/>
          <h1 class="title">{{title}}</h1>
        </div>
        <div>
          <slot name="action"></slot>
        </div>
      </div>

      <div :class="`n-card_section ${row && 'row n-card_section--row'}`">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<style lang="stylus">
  .n-card
    width 100%
    padding 0 1rem
    &_container
      width 100%
      overflow hidden
      border-radius 5px
      border 1px solid $accent
      background-color var(--bg-light)
    &_header
      padding 1rem 2rem
      .q-icon
        font-size 2.3rem
      .title
        margin 0
        font-weight 400
        font-size 1.8rem
        line-height 2.5rem
        color var(--text-dark)
    &_section
      font-size 1.5rem
      border-top 1px solid $accent
    &_section--row
      padding 2rem
      padding-bottom 1rem
</style>
