<script>
export default {
  name: 'NTableFooter',
  props: ['value', 'max'],
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  }
}
</script>

<template>
  <div class="n-table-footer row flex-center">
    <q-pagination v-model="model" :min="1" :max="max" :max-pages="6" color="primary" direction-links/>
  </div>
</template>

<style lang="stylus">
  .n-table-footer
    padding-top 2rem
</style>
