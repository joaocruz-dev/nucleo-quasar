<script>
import NTableHeader from './components/header'
import NTableContainer from './components/container'
import NTableFooter from './components/footer'
import { Table, UtilsObject } from '../../../utils'

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
        { label: '50', value: 50 }
      ]
    },

    filter: { type: Function, default: null },

    noAdd: { type: Boolean, default: false },
    noEdit: { type: Boolean, default: false },
    noModal: { type: Boolean, default: false },
    noDelete: { type: Boolean, default: false },
    noSearch: { type: Boolean, default: false }
  },
  data: () => ({
    page: 1,
    size: 5,
    search: '',
    update: false,
    columnSort: null,
    reverseSort: false
  }),
  created () {
    this.updateFn()
  },
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
      if (this.filter) data = data.filter(this.filter)
      if (this.search) data = Table.searchText(data, this.search)
      if (this.columnSort) {
        const field = this.columnSort.field
        let sort = null
        if (this.columnSort.sort) sort = (a, b) => this.columnSort.sort(UtilsObject.advancedField(a, field), UtilsObject.advancedField(b, field), a, b)
        data.sort(sort || UtilsObject.sortObject(field))
      }
      if (this.reverseSort) data.reverse()
      return data
    },
    pdata () {
      const position = this.size * this.page
      return this.filteredData.slice(position - this.size, position)
    },
    total () { return this.filteredData.length },
    max () { return Math.ceil(this.filteredData.length / this.size) || 1 }
  },
  methods: {
    updateFn () {
      if (!this.controller || this.update) return
      this.update = true
      this.$api.get(this.controller)
        .then(data => {
          this.data = data
          this.update = false
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
      this.model.selected = { ...data }
      this.model.modal = true
    },
    deleteFn (data) {
      const message = this.deleteField ? UtilsObject.advancedField(data, this.deleteField) : null
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
    controller () { this.updateFn() }
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
        <slot :name="column.field" v-bind:value="props.value" v-bind:object="props.object"/>
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
