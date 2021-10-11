<script>
import { Table, Utils } from '../../tools'

import NTableHeader from './components/header'
import NTableFooter from './components/footer'
import NTableContainer from './components/container'

export default {
  name: 'NTable',
  components: { NTableHeader, NTableContainer, NTableFooter },
  props: {
    value: { type: Table, required: true },

    title: { type: String, default: null },
    columns: { type: Array, default: () => [] },
    dataHeader: { type: Array, default: () => [] },
    customButtons: { type: Array, default: () => [] },

    controller: { type: String, default: null },

    deleteField: { type: String, default: 'name' },

    optionsSize: {
      type: Array,
      default: () => [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '15', value: 15 },
        { label: '25', value: 25 },
        { label: '50', value: 50 },
        { label: '100', value: 100 }
      ]
    },

    filter: { type: [Function, Object], default: null },
    // modalFilter: { type: Boolean, default: false },
    externalFilter: { type: Boolean, default: false },

    noAdd: { type: Boolean, default: false },
    noEdit: { type: Boolean, default: false },
    noModal: { type: Boolean, default: false },
    noDelete: { type: Boolean, default: false },
    noSearch: { type: Boolean, default: false }
  },
  data: () => ({
    page: 1,
    size: 5,
    totalCount: 0,

    search: '',
    columnSort: null,
    reverseSort: false,

    updating: false
  }),
  created () { this.updateFn() },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    },

    data: {
      get () { return this.model.data },
      set (val) { this.model.data = val }
    },

    filteredData () {
      let data = [...this.data]

      if (!this.externalFilter && this.filter) data = data.filter(this.filter)
      if (!this.externalFilter && this.search) data = Table.filterOfText(data, this.search)

      if (this.columnSort) {
        let sort = null
        const field = this.columnSort.field
        if (this.columnSort.sort) sort = (a, b) => this.columnSort.sort(Utils.getObjectValue(field, a), Utils.getObjectValue(field, b), a, b)
        data.sort(sort || Utils.sortObject(field))
      }
      if (this.reverseSort) data.reverse()

      return data
    },
    pdata () {
      if (this.externalFilter) return this.filteredData

      const position = this.page * this.size
      return this.filteredData.slice(position - this.size, position)
    },

    total () {
      if (this.externalFilter) return this.totalCount
      return this.filteredData.length
    },
    max () { return Math.ceil(this.total / this.size) || 1 }
  },
  methods: {
    updateFn () {
      if (!this.controller || this.updating) return
      this.updating = true

      let query = {}
      if (this.externalFilter) {
        if (this.filter) query = { ...this.filter }

        query.size = this.size
        query.page = this.page - 1
        if (this.search) query.text = this.search
      }

      this.$api.get(this.controller, { response: true, query })
        .then(({ data, headers }) => {
          this.data = data
          this.updating = false
          this.$emit('get', data)
          if (this.externalFilter) this.totalCount = headers['x-total-count']
        })
    },
    sortFn (column) {
      const field = this.columnSort ? this.columnSort.field : null
      if (column.field === field) this.reverseSort = !this.reverseSort
      else {
        this.columnSort = column
        this.reverseSort = false
      }
    },
    eventFn ({ name, data }) {
      if (this.noModal) return this.$emit(name, data)
      if (name === 'add') return this.addFn()
      if (name === 'edit') return this.editFn(data)
      if (name === 'delete') return this.deleteFn(data)
      this.$emit(name, data)
    },
    addFn () {
      this.model.modal = true
    },
    editFn (data) {
      this.model.selected = JSON.parse(JSON.stringify(data))
      this.model.modal = true
    },
    deleteFn (data) {
      const message = this.deleteField ? Utils.getObjectValue(this.deleteField, data) : null
      this.$Delete(message, this.controller, data)
        .then(data => {
          this.updateFn()
          this.$Msg(data.message)
        })
    },
    searchFn () {
      const options = {
        position: 'top',
        prompt: { model: this.search, type: 'text' }
      }
      this.$Alert('Pesquisar', '', options)
        .onOk(data => { this.search = data })
        .onCancel(() => { this.search = '' })
    }
  },
  watch: {
    'model.reload' () {
      if (!this.model.reload) return
      this.updateFn()
      this.model.reload = false
    },
    page () {
      if (this.externalFilter) this.updateFn()
    },
    size () {
      if (this.externalFilter) this.updateFn()
    },
    search () {
      if (this.externalFilter) {
        this.page = 1
        this.updateFn()
      }
    },
    filter () { this.updateFn() },
    controller () { this.updateFn() },
    externalFilter () { this.updateFn() }
  }
}
</script>

<template>
  <div class="n-table">
    <n-table-header :title="title" :search.sync="search" :total="total" :size.sync="size" :options-size="optionsSize"
      :no-add="noAdd" :no-search="noSearch" @add="eventFn({ name: 'add' })" @search="searchFn">

      <template #header-filter>
        <slot name="header-filter"/>
      </template>

    </n-table-header>

    <n-table-container :columns="columns" :data="pdata" :custom-buttons="customButtons"
      :no-delete="noDelete" :no-edit="noEdit" @sort="sortFn" @event="eventFn" v-if="pdata.length">

      <template v-for="column in columns" v-slot:[column.field]="props">
        <slot :name="column.field" :value="props.value" :object="props.object" :index="props.index"/>
      </template>

    </n-table-container>

    <div class="none" v-else>
      Nenhum Registro Encontrado
    </div>

    <n-table-footer v-model="page" :max="max"/>
  </div>
</template>

<style lang="stylus">
  .n-table
    .none
      padding 3rem 0
      font-weight 300
      font-size 1.8rem
      text-align center
      color var(--text-dark)
</style>
