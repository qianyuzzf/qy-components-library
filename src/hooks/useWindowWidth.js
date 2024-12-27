import { ref, onMounted, onUnmounted } from 'vue'
import _ from 'lodash'

const useWindowWidth = (debounceDelay = 200) => {
  const screenWidth = ref(window.innerWidth)

  const updateScreenWidth = _.debounce(() => {
    screenWidth.value = window.innerWidth
  }, debounceDelay)

  onMounted(() => {
    window.addEventListener('resize', updateScreenWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth)
    updateScreenWidth.cancel() // 防止组件卸载后未清理的定时器
  })

  return screenWidth
}

export default useWindowWidth
