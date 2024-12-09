// textAlign转flex布局属性
export const textAlignToFlex = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

// 尺寸转化
export const sizeConversion = (size) => {
  return [0, '', '0', 'px', '0px'].includes(size) ? '' : size
}
