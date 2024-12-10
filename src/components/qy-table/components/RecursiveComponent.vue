<template>
  <div class="qy-title-row-item" v-for="(item, index) in data" :key="index">
    <div class="qy-title-row-item-label" :style="getTitleRowItemStyle(item)">{{ item?.label }}</div>
    <div class="qy-title-row-item-children" v-if="Array.isArray(item?.children) && item.children.length > 0">
      <RecursiveComponent :data="item.children"></RecursiveComponent>
    </div>
  </div>
</template>

<script setup>
import { textAlignToFlex, sizeConversion } from '@/components/qy-table/config.js'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

// 获取表头文本样式
const getTitleRowItemStyle = (item) => {
  const { fontSize, width, height, color, background, textAlign } = item?.style || {}
  return {
    fontSize,
    width: sizeConversion(width),
    height: sizeConversion(height),
    color,
    background,
    justifyContent: textAlignToFlex[textAlign],
  }
}
</script>

<script>
export default {
  name: 'RecursiveComponent',
}
</script>

<style lang="scss">
@use '@/assets/styles/constant.scss' as *;

.qy-title-row-item {
  flex-shrink: 0;

  .qy-title-row-item-label {
    display: flex;
    align-items: center;
    border-bottom: $border-line;
  }

  .qy-title-row-item-children {
    display: flex;
    align-items: center;
  }
}
</style>
