<script>
import NTableBtn from '../btn'

export default {
  name: 'NTableHeader',
  components: { NTableBtn },
  props: ['title', 'search', 'total', 'size', 'optionsSize', 'noAdd', 'noSearch'],
  computed: {
    sizeModel: {
      get () { return this.size },
      set (val) { this.$emit('update:size', val) }
    }
  },
  methods: {
    addFn () { this.$emit('add') },
    searchFn () { this.$emit('search') },
    cleanFn () { this.$emit('update:search', '') }
  }
}
</script>

<template>
  <div class="n-table-header row">

    <div class="row justify-between items-center col-12">
      <h1 class="title">{{ title }}</h1>

      <div class="row flex-center">
        <div class="search row flex-center" v-if="search">
          {{ search }}
          <n-table-btn size="1rem" label="Cancelar" icon="close" @click="cleanFn"/>
        </div>
        <n-table-btn size="1.7rem" label="Pesquisar" icon="search" @click="searchFn" v-if="!noSearch"/>
        <n-table-btn size="1.7rem" label="Adicionar" icon="add" @click="addFn" v-if="!noAdd"/>
      </div>
    </div>

    <div class="info row justify-between items-center col-12">
      <h2 class="sub-title">Total de registros: {{ total }}</h2>
      <n-select v-model="sizeModel" :options="optionsSize" rounded standout dense/>
    </div>

    <div class="filters row col-12">
      <slot name="header-filter"/>
    </div>

  </div>
</template>

<style lang="stylus">
  .n-table-header
    padding 2rem 3rem
    color var(--text-dark)
    .title
      color $primary
      font-weight 500
      font-size 2.8rem
      line-height 3rem
      text-transform uppercase
    .search
      padding .2rem 0
      font-weight 300
      font-size 1.7rem
      border-radius 1rem
      padding-left 1.5rem
      padding-right .5rem
      background-color rgba(#000, 0.1)
      .q-btn
        margin 0 .3rem
    .info
      .n-select
        padding 0
        min-width 150px
        @media (max-width $breakpoint-sm)
          min-width 125px
        .q-field--auto-height.q-field--dense.q-field--labeled .q-field__control-container
          padding-top 6px
        .q-field--standout.q-field--rounded .q-field__control
          box-shadow none
          background-color $primary !important
        .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input
          color #fff
        .q-field__marginal
          color #fff
    .sub-title
      font-weight 300
      font-size 1.8rem
      line-height 2rem
</style>
