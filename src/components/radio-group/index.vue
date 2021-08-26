<script>
export default {
  name: 'NRadioGroup',
  props: {
    value: { required: true },
    options: { type: Array, required: true },
    contentClass: { type: String, default: '' }
  },
  computed: {
    model: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  }
}
</script>

<template>
  <div class="n-radio-group row justify-around">

    <n-radio v-for="(radio, i) in options" :key="`n-radio-${i}`" v-model="model"
      :val="radio.value" :icon="radio.icon" :label="radio.label" :color="radio.color" :disable="!!radio.disable" :class="contentClass"/>

  </div>
</template>

<style lang="stylus">
  .n-radio-group
    // n-radio-group
</style>
