<template>
  <div class="qy-table">
    <div class="qy-table-content">
      <div class="qy-table-content-title">
        <div class="qy-title-row">
          <RecursiveComponent :data="title"></RecursiveComponent>
        </div>
      </div>
      <div class="qy-table-content-main">
        <div class="qy-main-row" v-for="(item, index) in data" :key="index">
          <div
            class="qy-main-row-item"
            v-for="(item2, index2) in columnsInfoArray"
            :key="index2"
            :style="getRowItemStyle(item2)"
          >
            {{ item[item2.value] }}
          </div>
        </div>
      </div>
      <div class="qy-table-content-footer"></div>
    </div>
  </div>
</template>

<script setup>
import { getRowItemStyle } from '@/components/qy-table/config.js'
import RecursiveComponent from '@/components/qy-table/components/RecursiveComponent.vue'

const props = defineProps({
  title: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  itemStyle: {
    type: Object,
    required: false,
    default: () => ({}),
  },
})

const columnsInfo = {} // 储存每列信息
const columnsInfoArray = [] // 储存每列信息数组

// 获取文本宽度
const getTextWidth = (text, fontSize) => {
  const htmlElement = document.documentElement  // 获取 <html> 元素
  const computedStyle = window.getComputedStyle(htmlElement)  // 获取计算后的样式
  // 通过canvas获取文本宽度
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = `${fontSize} ${computedStyle.fontFamily}`
  const metrics = context.measureText(text)
  return Math.ceil(metrics.width + 4) // 获取的宽度留4px边距向上取整
}

// 初始化节点
const initNode = (nodes) => {
  const { itemStyle } = props || {}
  if (Array.isArray(nodes)) {
    nodes.forEach(item => {
      const { style, children, label, value } = item || {}
      const fontSize = style?.fontSize || itemStyle?.fontSize || '16px'
      let width = '0'
      const color = style?.color || itemStyle?.color
      const background = style?.background || itemStyle?.background
      const textAlign = style?.textAlign || itemStyle?.textAlign || 'left'
      if (!children || children.length === 0) {
        width = style?.width || itemStyle?.width || getTextWidth(label, fontSize) + 'px' // 末节点才设置宽度
        columnsInfo[value] = item // 末节点信息存储到每列信息
        columnsInfoArray.push(item) // 末节点信息存储到每列信息数组
      } else {
        initNode(children)
      }
      item.style = {
        ...style,
        fontSize,
        width,
        color,
        background,
        textAlign,
      }
    })
  }
}

const init = () => {
  initNode(props.title)
}

init()
</script>

<style lang="scss">
@use '@/components/qy-table/index.scss';
</style>
