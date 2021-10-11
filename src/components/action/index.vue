<script>
export default {
  name: 'NAction',
  props: {
    icon: { type: String, required: true },

    label: { type: String, default: null },
    color: { type: String, default: void 0 }
  },
  methods: {
    clickFn () { this.$emit('click') }
  }
}
</script>

<template>
  <div class="n-action">
    <q-btn flat round :icon="icon" :color="color" @click="clickFn">
      <q-tooltip v-if="label">{{label}}</q-tooltip>
    </q-btn>
  </div>
</template>

<style lang="stylus">
  .n-action
    .q-icon
      font-size 2.3rem
</style>
