<script>
const ok = { label: 'Salvar', color: 'primary', icon: 'done' }
const cancel = { label: 'Cancelar', color: 'text-dark', icon: void 0 }

export default {
  name: 'NForm',
  props: {
    value: { type: Boolean, required: true },

    data: { default: null },
    error: { type: Boolean, default: null },
    method: { type: String, default: null },
    validate: { type: Function, default: null },
    controller: { type: String, default: null },

    title: { type: String, default: null },
    goBack: { type: Boolean, default: false },

    ok: { type: Object, default: () => {} },
    cancel: { type: Object, default: () => {} },

    noOk: { type: Boolean, default: false },
    noClose: { type: Boolean, default: false },
    noCancel: { type: Boolean, default: false },

    contentClass: { type: String, default: 'col-lg-8 col-md-9 col-sm-12 col-xs-12' }
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    },

    btnOk () { return { ...ok, ...this.ok } },
    btnCancel () { return { ...cancel, ...this.cancel } }
  },
  methods: {
    hideFn () {
      this.$emit('hide')
    },
    closeFn () {
      this.model = false
    },

    submitFn () {
      if (!this.method || !this.controller) return this.$emit('submit')
      if (!this.validate || this.validate(this.ajaxFn) === true) return this.ajaxFn()
    },
    ajaxFn () {
      this.$q.loading.show()
      this.$api[this.method](this.controller, this.data, { error: true, loading: false })
        .then(data => {
          this.$q.loading.hide()
          this.$emit('then', data)
        })
        .catch(res => {
          this.$q.loading.hide()
          if (this.error === true) return this.$emit('catch', res)
          if (this.error === null) return this.$Msg((res.data || res).message, false)
          console.error(res)
        })
    }
  }
}
</script>

<template>
  <q-dialog v-model="model" maximized position="right" @hide="hideFn">
    <div class="n-form row justify-end" @click="closeFn">
      <div :class="`n-form_container ${contentClass}`" @click.stop="">

        <div class="n-form_header row items-center">
          <n-action :icon="goBack ? 'west' : 'close'" @click="closeFn" v-if="!noClose"/>
          <h1 class="title">{{title}}</h1>
        </div>

        <form @submit.prevent="submitFn" class="n-form_form row">
          <slot></slot>
          <button type="submit" class="n-form_form--submit"></button>
        </form>

        <div class="n-form_buttons row justify-end">
          <n-btn :label="btnCancel.label" :color="btnCancel.color" @click="closeFn" v-if="!noCancel"/>
          <n-btn :label="btnOk.label" :color="btnOk.color" :icon="btnOk.icon" @click="submitFn" v-if="!noOk"/>
        </div>

      </div>
    </div>
  </q-dialog>
</template>

<style lang="stylus">
  .n-form
    min-width 100vw
    box-shadow none !important
    border-radius 0 !important
    &_container
      position relative
      background-color var(--bg-dark)
      box-shadow 0px 0px 30px rgba(#000, 0.15)
    &_header
      padding 1rem
      background-color var(--bg-light)
      border-bottom 1px solid var(--border)
      .title
        margin 0
        font-size 2rem
        font-weight 400
        line-height 3rem
        margin-left 1rem
        color var(--text-dark)
    &_form
      padding 2rem
      &--submit
        display none
    &_buttons
      padding 2rem
      padding-top 0
      .n-btn
        margin 0 1rem
</style>
