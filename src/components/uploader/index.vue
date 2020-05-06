<script>
export default {
  name: 'FUploader',
  props: {
    value: { type: Array, default: () => [] },
    accept: { default: null },
    multiple: { default: null },
    error: { default: null },
    imagem: { type: Array, default: () => [] }
  },
  data: () => ({
    model: [],
    files: []
  }),
  methods: {
    upload (event) {
      event.forEach(e => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(e)
        fileReader.onload = (file) => {
          this.model.push({ name: e.name, base64: file.target.result })
          this.files.push(e)
        }
      })
    },
    removed ({ 0: file }) {
      this.files.splice(this.files.indexOf(file), 1)
      this.model = []
      this.upload(this.files)
    },
    delet (remove) {
      if (this.imagem.length) return this.$emit('delete-imagem')
      return remove()
    }
  },
  watch: {
    files () { this.$emit('input', this.model) }
    // value () {
    //   if (!this.value || !this.value.length) return
    //   else if (this.value.length <= this.files.length) return
    // }
  }
}
</script>

<template>
  <f-expansion label="Imagem" icon="attach_file" :error="error">
    <q-uploader :accept="accept" :multiple="multiple" @added="upload" @removed="removed">

      <template #header="scope">
        <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
          <div class="col">
            <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>
          </div>
          <q-btn icon="add" round dense flat v-if="scope.canAddFiles && !imagem">
            <q-uploader-add-trigger/>
            <q-tooltip>Selecionar arquivo{{ multiple ? 's' : '' }}</q-tooltip>
          </q-btn>
          <q-btn icon="delete_forever" @click="delet(scope.removeQueuedFiles)" round dense flat
            v-if="scope.queuedFiles.length > 0 || imagem">
            <q-tooltip>Limpar</q-tooltip>
          </q-btn>
        </div>
      </template>

      <template #list v-if="imagem && files.length === 0">
        <q-img v-for="(img, i) in imagem" :key="`list-img-${i}`" :src="img" spinner-color="primary" style="width: 100%"/>
      </template>

    </q-uploader>
  </f-expansion>
</template>

<style lang="stylus" scoped>
  .q-uploader
    background-color transparent
    .q-uploader__subtitle
      padding-left 1rem
</style>
