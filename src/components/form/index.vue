<script>
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
    ok: { type: String, default: 'Salvar' },
    cancel: { type: String, default: 'Cancelar' },
    colorOk: { type: String, default: 'primary' },

    noOk: { type: Boolean, default: false },
    noClose: { type: Boolean, default: false },
    noCancel: { type: Boolean, default: false },
    noButtons: { type: Boolean, default: false },

    maximized: { type: Boolean, default: null },
    minWidth: { type: String, default: '50vw' }
  },
  data: () => ({
    close_name: null,
    width: window.innerWidth
  }),
  created () {
    this.$q.loading.hide()
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
    })
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    },
    full () {
      if (this.maximized === true) return true
      if (this.maximized === false) return false
      return this.width <= 768
    }
  },
  methods: {
    close (name) {
      this.$emit(name)
      this.close_name = name
      this.model = false
    },
    submitFn () {
      if (!this.method || !this.controller) return this.$emit('submit')
      if (!this.validate || this.validate(this.ajax) === true) return this.ajax()
    },
    ajax () {
      this.$q.loading.show()
      this.$api[this.method](this.controller, this.data, { error: true, loading: false })
        .then(data => {
          this.$q.loading.hide()
          this.$emit('then', data)
        })
        .catch(res => {
          this.$q.loading.hide()
          if (this.error === true) return this.$emit('catch', res)
          if (this.error === null) return this.$Msg(res.data.message, false)
          console.error(res)
        })
    },
    hide () {
      this.$emit('hide', this.close_name)
      this.close_name = null
    },
    beforeHide () { this.$emit('before-hide') }
  }
}
</script>

<template>
  <q-dialog v-model="model" persistent :maximized="full" transition-show="scale" transition-hide="scale"
    @keyup.esc="close('esc')" @hide="hide" @before-hide="beforeHide">
    <q-card :style="`min-width: ${minWidth}`" class="n-form">
      <q-card-section class="container">
        <n-title :label="title" v-if="title"/>

        <div class="close" v-if="!noClose">
          <q-btn dense flat round icon="close" @click="close('close')">
            <q-tooltip content-class="">Fechar</q-tooltip>
          </q-btn>
        </div>

        <form @submit.prevent="submitFn" class="form row">
          <slot></slot>
          <button type="submit" class="submit"></button>
        </form>
      </q-card-section>

      <q-card-actions align="right" v-if="!noButtons" class="actions">
        <n-btn :label="cancel" color="text-dark" outline @click="close('cancel')" v-if="!noCancel"/>
        <n-btn :label="ok" :color="colorOk" @click="submitFn" v-if="!noOk"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="stylus">
  .n-form
    position relative
    background-color var(--bg-light)
    .container
      padding 0
      .close
        top 0
        right 0
        margin .5rem
        position absolute
      .form
        padding 2rem
        .submit
          display none
    .actions
      padding-bottom 1rem
      padding-right 1.5rem
      .n-btn
        margin-left 2rem
</style>
