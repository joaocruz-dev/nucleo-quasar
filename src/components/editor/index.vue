<script>
export default {
  name: 'NEditor',
  props: {
    value: { type: String, required: true },
    error: { type: Boolean, default: false },
    errorMessage: { type: String, default: 'Campo obrigatório' }
  },
  data: () => ({
    definitions: {
      // save: {
      //   tip: 'Salvar Alterações',
      //   icon: 'save',
      //   label: 'Salvar'
      // }
    },
    toolbar: [
      ['left', 'center', 'right', 'justify'],
      ['bold', 'italic', 'underline', 'strike'],
      ['undo', 'redo'],
      ['save']
    ]
  }),
  computed: {
    model: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  }
}
</script>

<template>
  <div class="n-editor">
    <q-editor v-model="model" min-height="10rem" content-class="bg-bg-clear" toolbar-text-color="accent"
      toolbar-toggle-color="primary" toolbar-bg="bg-clear" :definitions="definitions" :toolbar="toolbar"/>
    <span class="error">{{ error ? errorMessage : '' }}</span>
  </div>
</template>

<style lang="stylus">
  .n-editor
    .error
      color $negative
</style>
