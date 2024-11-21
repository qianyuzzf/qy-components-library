const Home = () => import('@/views/home/index.vue')

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '首页',
    },
  },
]

export default routes
