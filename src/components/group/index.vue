<script>
export default {
  name: 'FGroup',
  props: {
    group: { default: 'f-group' },
    items: { required: true }
  }
}
</script>

<template>
  <div class="f-group">
    <q-list bordered>
      <q-expansion-item v-for="i in items" :key="i.name" :group="group" :icon="i.icon" :label="i.label"
        :caption="i.caption" expand-separator>
        <q-card>
          <q-card-section>
            <slot :name="i.name">
            </slot>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<style lang="stylus" scoped>
  .f-group
    .q-expansion-item
      color $accent
      .q-card
        background #f9f9f9 !important
</style>
