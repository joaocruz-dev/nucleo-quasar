<script>
export default {
  name: 'NTableBtn',
  props: {
    icon: { default: '' },
    label: { default: false },
    size: { default: null },
    color: { default: 'primary' }
  },
  methods: {
    clickFn () { this.$emit('click') }
  }
}
</script>

<template>
  <div class="n-table-btn">
    <q-btn :icon="icon" :size="size" :text-color="color" flat round @click="clickFn">
      <q-tooltip v-if="label">{{ label }}</q-tooltip>
      <slot>
      </slot>
    </q-btn>
  </div>
</template>

<style lang="stylus">
  .n-table-btn
    .q-btn
      font-size 1.35rem
      @media (max-width $breakpoint-sm)
        font-size 1.6rem
</style>
