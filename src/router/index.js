import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  const { title } = (to || {}).meta || {}
  if (title) {
    document.title = title
  }
})

export default router
