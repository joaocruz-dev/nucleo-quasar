<script>
export default {
  name: 'NExpansion',
  props: {
    label: { type: String, default: null },
    icon: { type: String, default: null },
    group: { type: String, default: null },
    error: { type: Boolean, default: false },
    color: { type: String, default: 'text-light' }
  },
  computed: {
    $color () { return this.error ? 'negative' : this.color }
  }
}
</script>

<template>
  <q-expansion-item :group="group" class="n-expansion">

    <template v-slot:header>
      <q-item-section avatar>
        <slot name="avatar" v-if="$slots.avatar"/>
        <q-icon :name="icon" :color="$color" v-else-if="icon"/>
      </q-item-section>

      <q-item-section :class="`text-${$color}`">
        {{label}}
      </q-item-section>
    </template>

    <div :class="`n-expansion__container text-${color}`">
      <slot></slot>
    </div>

  </q-expansion-item>
</template>

<style lang="stylus">
  .n-expansion
    &__container
      padding 2rem
</style>
