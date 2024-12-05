<template>
  <div class="qy-title-row-item" v-for="(item, index) in data" :key="index">
    <div class="qy-title-row-item-label" :style="getRowItemStyle(item)">{{ item?.label }}</div>
    <div class="qy-title-row-item-children" v-if="Array.isArray(item?.children) && item.children.length > 0">
      <RecursiveComponent :data="item.children"></RecursiveComponent>
    </div>
  </div>
</template>

<script setup>
import { getRowItemStyle } from '@/components/qy-table/config.js'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
</script>

<script>
export default {
  name: 'RecursiveComponent',
}
</script>

<style lang="scss">
.qy-title-row-item {
  flex-shrink: 0;

  .qy-title-row-item-children {
    display: flex;
    align-items: center;
  }
}
</style>
