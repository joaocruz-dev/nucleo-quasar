<script>
export default {
  name: 'NGroupCheckbox',
  props: {
    value: { type: Array, required: true },
    options: { type: Array, required: true }
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', this.model) }
    }
  }
}
</script>

<template>
  <div class="n-group-checkbox">
    <q-list bordered v-if="model.length">
      <n-expansion v-for="(m, i) in model" :key="`group-checkbox-${i}`" :icon="m.icon" :label="m.label"
        group="group-checkbox">

        <div v-for="(c, j) in m.checks" :key="`checkbox-${j}`" class="n-group-checkbox__checkboxs">
          <h1 class="title">{{ c.label }}</h1>
          <q-option-group v-model="c.model" type="checkbox" :options="options" class="row"/>
        </div>

      </n-expansion>
    </q-list>
  </div>
</template>

<style lang="stylus">
  .n-group-checkbox
    width 100%
    margin-bottom 2rem
    &__checkboxs
      padding 0 2rem
      padding-bottom 2rem
      .title
        font-weight 400
        font-size 1.6rem
        line-height 2rem
</style>
