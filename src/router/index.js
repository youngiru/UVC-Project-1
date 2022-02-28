import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    redirect: '/home',
    children: []
  },
  {
    path: '/home',
    component: () => import('../views'),
    children: []
  },
  {
    path: '/auth',
    component: () => import('../views/auth'),
    children: [
      {
        path: '/auth/login',
        component: () => import('../views/auth/login.vue'),
        meta: { header: false } // 로그인 페이지에선 헤더 제거
      },
      {
        path: '/auth/logout',
        component: () => import('../views/auth/logout.vue')
      },
      {
        path: '/auth/join',
        component: () => import('../views/auth/join.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('../components/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
