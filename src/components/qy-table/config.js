// 获取文本样式
export const getRowItemStyle = (item) => {
  const { fontSize, width, color, background, textAlign } = item?.style || {}
  return {
    fontSize,
    width: ['', '0', 0, '0px'].includes(width) ? '' : width,
    color,
    background,
    textAlign,
  }
}
