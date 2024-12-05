// textAlign转flex布局属性
const textAlignToFlex = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

// 获取文本样式
export const getRowItemStyle = (item) => {
  const { fontSize, width, height, color, background, textAlign } = item?.style || {}
  return {
    fontSize,
    width: [0, '', '0', 'px', '0px'].includes(width) ? '' : width,
    height: [0, '', '0', 'px', '0px'].includes(height) ? '' : height,
    color,
    background,
    justifyContent: textAlignToFlex[textAlign],
  }
}
