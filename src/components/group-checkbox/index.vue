<script>
export default {
  name: 'FGroupCheckbox',
  props: {
    value: { type: Array, required: true },
    options: { type: Array, required: true }
  },
  data: () => ({
    model: []
  }),
  created () { this.set() },
  methods: {
    set () { this.model = this.value }
  },
  watch: {
    model: {
      handler: function () { this.$emit('input', this.model) },
      deep: true
    },
    value () { this.set() }
  }
}
</script>

<template>
  <div class="f-group-checkbox">
    <q-list bordered>
      <f-expansion v-for="(m, i) in model" :key="`group-checkbox-${i}`" :icon="m.icon" :label="m.title"
        group="group-checkbox">
        <q-card>
          <q-card-section>
            <div v-for="(c, j) in m.checks" :key="`checkbox-${j}`" class="checkbox">
              <h1 class="title">{{ c.title }}</h1>
              <q-option-group v-model="c.model" type="checkbox" class="row" :options="options"/>
            </div>
          </q-card-section>
        </q-card>
      </f-expansion>
    </q-list>
  </div>
</template>

<style lang="stylus" scoped>
  .f-group-checkbox
    width 100%
    margin-bottom 2rem
    .q-card
      box-shadow none
      background transparent !important
      .checkbox
        padding 0 2rem
        padding-bottom 2rem
        .title
          font-size 1.6rem
          line-height 2rem
          font-weight 400
</style>
