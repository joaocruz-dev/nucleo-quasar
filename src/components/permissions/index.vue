<script>
export default {
  name: 'NPermissions',
  props: {
    // [{ value: '', model: [''] }]
    value: { type: Array, required: true },
    // [{ label: '', icon: '', groups: [{ label: '', value: '', options: [{ label: '', value: '' }] }] }]
    options: { type: Array, required: true },

    mask: { type: Function, default: null }
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  },
  methods: {
    getModelFn (value) {
      return (this.model.find(x => x.value === value) || { model: [] }).model
    },
    setModelFn (value, model) {
      if (this.mask) model = this.mask(value, model)
      this.model.find(x => x.value === value).model = model
      this.model = JSON.parse(JSON.stringify(this.model))
    },
    stabilizerFn () {
      const options = JSON.parse(JSON.stringify(this.options))
      this.model = options
        .reduce((acc, x) => acc.concat(x.groups), [])
        .map(x => {
          const model = this.getModelFn(x.value)
          return { value: x.value, model }
        })
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler () { this.stabilizerFn() }
    }
  }
}
</script>

<template>
  <div class="n-permissions">
    <q-list bordered separator>
      <n-expansion v-for="(permission, i) in options" :key="`permissions-${i}`"
        :icon="permission.icon" :label="permission.label" group="permissions">

        <div v-for="(group, j) in permission.groups" :key="`group-${j}`" class="n-permissions_group">
          <h1 class="n-permissions_group--label">{{group.label}}</h1>
          <q-option-group :value="getModelFn(group.value)" type="checkbox"
            :options="group.options" class="row" @input="setModelFn(group.value, $event)"/>
        </div>

      </n-expansion>
    </q-list>
  </div>
</template>

<style lang="stylus" scoped>
  .n-permissions
    width 100%
    padding 0 1rem
    .q-list
      background-color var(--bg-light)
    &_group
      padding 0 2rem
      &--label
        font-weight 400
        font-size 1.6rem
        line-height 2rem
</style>
