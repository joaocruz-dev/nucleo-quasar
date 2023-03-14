<script>
import { Table } from '../../tools'

export default {
  name: 'NList',
  props: {
    value: { type: Array, required: true },

    icon: { type: String, required: true },
    title: { type: String, required: true },

    noAdd: { type: Boolean, default: false },
    noEdit: { type: Boolean, default: false },
    noDelete: { type: Boolean, default: false }
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  },
  methods: {
    openFn (item, index) {
      this.$emit('open', { item: JSON.parse(JSON.stringify(item)), index })
    },
    deleteFn (e, item, index) {
      e.reset()
      this.model.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="n-list">
    <n-card :icon="icon" :title="title">

      <template #action>
        <n-action icon="add" @click="openFn(null, null)" v-if="!noAdd"/>
      </template>

      <q-list>
        <q-slide-item v-for="(item, i) in model" :key="`n-list_item--${i}`" right-color="negative"
          @right="deleteFn($event, item, i)">

          <template #right v-if="!noDelete">
            Excluir
          </template>

          <div :class="`n-list_item row items-center ${noEdit ? 'default' : 'pointer'}`" v-ripple="!noEdit" @click="!noEdit && openFn(item, i)">
            <div class="row col">
              <slot name="item" :item="item" :index="i"/>
            </div>
            <n-action icon="east" v-if="!noEdit"/>
          </div>

        </q-slide-item>
      </q-list>

    </n-card>
  </div>
</template>

<style lang="stylus">
  .n-list
    width 100%
    .n-card_section
      border none
      .q-list
        .q-slide-item
          border-top 1px solid var(--border)
          .n-list_item
            font-size 1.5rem
            padding 1rem 2rem
            position relative
            &:hover
              background-color var(--bg-dark)
        .default
          cursor default
        .pointer
          cursor pointer
</style>
