<script>
import NTableBtn from '../btn'
import { Utils } from '../../../../tools'

export default {
  name: 'NTableContainer',
  components: { NTableBtn },
  props: ['columns', 'data', 'customButtons', 'noDelete', 'noEdit'],
  mounted () { this.setAction() },
  computed: {
    ifButtons () { return !(this.noDelete && this.noEdit && !this.customButtons.length) }
  },
  methods: {
    setAction () {
      setTimeout(() => {
        const columnAction = document.getElementById('NTableContainer-ColumnAction')
        const buttonAction = document.getElementById('NTableContainer-ButtonAction-0') || { offsetWidth: 0 }
        columnAction.style.width = `${buttonAction.offsetWidth}px`
      }, 10)
    },
    sortFn (column) { this.$emit('sort', column) },
    emitFn (name, data) { this.$emit('event', { name, data }) },
    extractFn (data, field) { return Utils.getObjectValue(field, data) }
  },
  watch: {
    customButtons: {
      deep: true,
      handler () { this.setAction() }
    },
    noDelete () { this.setAction() },
    noEdit () { this.setAction() }
  }
}
</script>

<template>
  <div class="n-table-container">

    <div class="n-table-container__columns row disable-sm">

      <div class="row items-center col">
        <div v-for="(column, i) in columns" :key="`column-${i}`"
          :class="`column text-${column.align || 'center'} ${column.col} disable-${column.disable}`">
          {{ column.label }}
          <q-btn icon="keyboard_arrow_down" round flat @click="sortFn(column)" v-if="column.sortable"/>
        </div>
      </div>

      <div id="NTableContainer-ColumnAction" class="column column-action text-center">
        Ações
      </div>

    </div>

    <div class="n-table-container__data">

      <div v-for="(d, i) in data" :key="`data-${i}`" class="data row items-center">

        <div class="items row items-center col">
          <div v-for="(column, j) in columns" :key="`item-${j}`"
            :class="`item row flex-center text-${column.align || 'center'} ${column.col} disable-${column.disable}`">
            <h1 class="title">{{ column.label }}:</h1>
            <slot :name="column.field" :value="extractFn(d, column.field)" :object="d" :index="i" v-if="column.template"/>
            <p class="paragraph col-12" v-else-if="column.format">{{ column.format(extractFn(d, column.field), d) }}</p>
            <p class="paragraph col-12" v-else>{{ extractFn(d, column.field) }}</p>
          </div>
        </div>

        <div class="others row justify-end items-center">

          <!-- <div class="expand row items-center">
            <n-table-btn icon="keyboard_arrow_down" color="text-dark"/>
          </div> -->

          <div class="buttons">
            <div :id="`NTableContainer-ButtonAction-${i}`" class="row flex-center" v-if="ifButtons">
              <n-table-btn label="Excluir" icon="o_delete" color="negative" @click="emitFn('delete', d)" v-if="!noDelete"/>
              <n-table-btn label="Editar" icon="o_edit" color="text-dark" @click="emitFn('edit', d)" v-if="!noEdit"/>
              <n-table-btn label="Outros" icon="more_vert" color="text-dark" v-if="customButtons.length">
                <q-menu>
                  <div class="button-action__menu">
                    <q-btn v-for="(button, j) in customButtons" :key="`custom-button-${j}`" flat :icon="button.icon"
                      :label="button.label" :color="button.color" :text-color="button.textcolor || 'text-dark'"
                      @click="emitFn(button.emit, d)"/>
                  </div>
                </q-menu>
              </n-table-btn>
            </div>
          </div>

        </div>

        <!-- <div class="items-expand col-12">
        </div> -->

      </div>

    </div>

  </div>
</template>

<style lang="stylus">
  .n-table-container
    font-size 1.4rem
    color var(--text-dark)
    @media (max-width $breakpoint-lg)
      font-size 1.7rem
    & *
      transition all .2s ease
    &__columns
      overflow hidden
      padding 1rem 2rem
      .column
        overflow hidden
        font-weight 700
        position relative
        .q-btn
          top 50%
          right 0
          position absolute
          transform translate(0, -50%)
    &__data
      .data
        overflow hidden
        margin-top 1rem
        padding 3rem 2rem
        border-radius 1rem
        border 1px solid var(--border)
        background-color var(--bg-light)
        &:hover
          box-shadow 0px 0px 30px rgba(#000, 0.1)
        .items
          @media (max-width $breakpoint-sm)
            flex none
            width 100%
          .item
            overflow hidden
            @media (max-width $breakpoint-sm)
              width 100%
              justify-content flex-start
            .title
              margin 0
              display none
              font-weight 700
              font-size 1.8rem
              line-height 3rem
              padding-right 1rem
              @media (max-width $breakpoint-sm)
                display block
            .paragraph
              margin 0
              padding 0 1rem
              @media (max-width $breakpoint-sm)
                width auto
                padding-left 0
        .others
          @media (max-width $breakpoint-sm)
            width 100%
            padding-top 1rem
          .expand
            display none
            @media (max-width $breakpoint-sm)
              display flex
          .buttons
            .button-action
              // button-action
        .items-expand
          // items-expand

    .disable-lg
      @media (max-width $breakpoint-lg)
        display none
    .disable-md
      @media (max-width $breakpoint-md)
        display none
    .disable-sm
      @media (max-width $breakpoint-sm)
        display none
    .disable-xs
      @media (max-width $breakpoint-xs)
        display none

  .button-action__menu
    min-width 150px
    background-color var(--bg-light)
    .q-btn
      width 100%
      text-transform inherit
</style>
