<script>
export default {
  name: 'FExpansion',
  props: {
    label: { default: null },
    icon: { default: null },
    error: { default: null },
    contentClass: { default: '' }
  },
  computed: {
    color () { return this.error ? 'negative' : 'primary' }
  }
}
</script>

<template>
  <q-expansion-item group="f-expansion" :icon="icon" :label="label" :class="`text-${color} shadow-2`">
    <q-card>
      <q-card-section :class="contentClass">
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<style lang="stylus" scoped>
  .q-expansion-item
    .q-card
      background transparent !important
      .q-card__section
        color $grey-9
</style>
