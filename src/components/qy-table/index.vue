<template>
  <div class="qy-table" ref="qyTableRef">
    <div class="qy-table-content">
      <div class="qy-table-content-title">
        <div class="qy-title-row">
          <RecursiveComponent :data="componentProps.title"></RecursiveComponent>
        </div>
      </div>
      <div class="qy-table-content-main">
        <div class="qy-main-row" v-for="(item, index) in componentProps.data" :key="index">
          <div
            class="qy-main-row-item"
            v-for="(item2, index2) in columnsInfoArray"
            :key="index2"
            :style="getContentRowItemStyle(item2)"
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
import { onMounted, onUnmounted, ref } from 'vue'
import _ from 'lodash'
import { sizeConversion, textAlignToFlex } from '@/components/qy-table/config.js'
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
  titleStyle: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  contentStyle: {
    type: Object,
    required: false,
    default: () => ({}),
  }
})

// 组件存储接收的props
const componentProps = ref({
  title: [],
  data: [],
  titleStyle: {},
  contentStyle: {},
})

// 把props放在组件内部
const initComponent = () => {
  componentProps.value.title = _.cloneDeep(props.title)
  componentProps.value.data = _.cloneDeep(props.data)
  componentProps.value.titleStyle = _.cloneDeep(props.titleStyle)
  componentProps.value.contentStyle = _.cloneDeep(props.contentStyle)
}

const qyTableRef = ref() // ref绑定
const titleMaxHeight = ref('') // 表头高度
const columnsInfo = {} // 储存每列信息
const columnsInfoArray = [] // 储存每列信息数组
const initTableWidth = ref(0) // 表格初始宽度

// 获取内容文本样式
const getContentRowItemStyle = (item) => {
  const { style, label } = item || {}
  const { width, textAlign } = style || {}
  const { color, background, fontSize = '16px' } = componentProps.value?.contentStyle || {}
  const height = componentProps.value?.contentStyle?.height || getTextHeight(label, fontSize) * 1.5 + 'px'
  return {
    fontSize,
    width: sizeConversion(width),
    height: sizeConversion(height),
    color,
    background,
    justifyContent: textAlignToFlex[textAlign],
  }
}

// 获取文本宽度
const getTextWidth = (text, fontSize) => {
  const htmlElement = document.documentElement  // 获取<html>元素
  const computedStyle = window.getComputedStyle(htmlElement)  // 获取计算后的样式
  // 通过canvas获取文本宽度
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = `${fontSize} ${computedStyle.fontFamily}`
  const metrics = context.measureText(text)
  return Math.ceil(metrics.width + 4) // 获取的宽度留4px边距向上取整
}

// 获取文本高度
const getTextHeight = (text, fontSize) => {
  const htmlElement = document.documentElement  // 获取<html>元素
  const computedStyle = window.getComputedStyle(htmlElement)  // 获取计算后的样式
  // 创建一个不可见的span元素
  const span = document.createElement('span')
  // 设置样式
  span.style.position = 'absolute' // 不影响页面布局
  span.style.whiteSpace = 'nowrap' // 单行显示
  span.style.visibility = 'hidden' // 不可见
  span.style.font = `${fontSize} ${computedStyle.fontFamily}` // 设置字体样式
  span.textContent = text // 设置文本
  document.body.appendChild(span) // 添加到文档中
  const height = span.offsetHeight // 获取高度
  document.body.removeChild(span) // 移除元素
  return height
}

// 初始化节点
const initNode = (nodes) => {
  const { titleStyle } = componentProps.value || {}
  if (Array.isArray(nodes)) {
    nodes.forEach(item => {
      const { style, children, label, value } = item || {}
      const fontSize = style?.fontSize || titleStyle?.fontSize || '16px'
      let width = '0'
      const height = style?.height || titleStyle?.height || getTextHeight(label, fontSize) * 1.5 + 'px'
      const color = style?.color || titleStyle?.color
      const background = style?.background || titleStyle?.background
      const textAlign = style?.textAlign || titleStyle?.textAlign || 'left'
      if (children?.length > 0) {
        initNode(children)
      } else {
        width = style?.width || titleStyle?.width || getTextWidth(label, fontSize) + 'px' // 末节点才设置宽度
        columnsInfo[value] = item // 末节点信息存储到每列信息
        columnsInfoArray.push(item) // 末节点信息存储到每列信息数组
      }
      item.style = {
        ...style,
        fontSize,
        width,
        height,
        color,
        background,
        textAlign,
      }
    })
  }
}

// 获取节点最高高度
const getNodeHeight = (nodes) => {
  let maxHeight = 0
  if (Array.isArray(nodes)) {
    nodes.forEach(item => {
      const { style, children } = item || {}
      let nodeHeight = parseFloat(style?.height || '0')
      if (children?.length > 0) {
        nodeHeight += getNodeHeight(children)
      }
      maxHeight = Math.max(maxHeight, nodeHeight)
    })
  }
  return maxHeight
}

// 设置节点高度
const setNodeHeight = (nodes, currentHeight) => {
  if (Array.isArray(nodes)) {
    nodes.forEach(item => {
      const { style, children } = item || {}
      if (children?.length > 0) {
        let nodeHeight = parseFloat(style?.height || '0')
        setNodeHeight(children, currentHeight - nodeHeight)
      } else {
        style.height = currentHeight + 'px'
      }
    })
  }
}

// 获取表格宽度
const getTableWidth = (array) => {
  let result = 0
  if (Array.isArray(array)) {
    array.forEach(item => {
      if (item?.children) {
        result += getTableWidth(item.children)
      } else {
        result += parseFloat(item.style?.width || '0')
      }
    })
  }
  return result
}

// 设置节点新宽度
const setNodeNewWidth = (array, scale) => {
  if (Array.isArray(array)) {
    array.forEach(item => {
      if (item?.children) {
        setNodeNewWidth(item.children, scale)
      } else {
        item.style.width = _.round(parseFloat(item.style?.width || '0') * scale, 4) + 'px'
      }
    })
  }
}

// 表格宽度缩放
const tableWidthScale = (value) => {
  const currentTableWidth = getTableWidth(componentProps.value.title)
  // 表格目标宽度不能小于初始宽度
  const targetWidth = value > initTableWidth.value ? value : initTableWidth.value
  // 获取缩放系数
  const scale = _.round(targetWidth / currentTableWidth, 4)
  setNodeNewWidth(componentProps.value.title, scale)
}

// 表格宽度缩放防抖
const tableWidthScaleDebounce = _.debounce(tableWidthScale, 200)

const resizeObserver = ref(null) // DOM元素监听
// 初始化ResizeObserver
const initResizeObserver = () => {
  resizeObserver.value = new ResizeObserver((entries) => {
    for (let entry of entries) {
      tableWidthScaleDebounce(entry.target.offsetWidth) // 更新宽度
    }
  })
  if (qyTableRef.value) {
    resizeObserver.value.observe(qyTableRef.value) // 监听目标元素
  }
}
// 清理ResizeObserver
const destroyResizeObserver = () => {
  if (resizeObserver.value && qyTableRef.value) {
    resizeObserver.value.unobserve(qyTableRef.value)
  }
  resizeObserver.value = null
}

// 初始化
const init = () => {
  initComponent()
  initNode(componentProps.value.title)
  titleMaxHeight.value = getNodeHeight(componentProps.value.title)
  setNodeHeight(componentProps.value.title, titleMaxHeight.value)
  initTableWidth.value = getTableWidth(componentProps.value.title)
  tableWidthScale(qyTableRef.value.offsetWidth)
}

onMounted(() => {
  init()
  initResizeObserver()
})

onUnmounted(() => {
  destroyResizeObserver()
})
</script>

<style lang="scss">
@use '@/components/qy-table/index.scss' as *;
</style>
