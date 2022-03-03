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
        path: '/sub/activities',
        component: () => import('../views/sub/activities.vue')
      },
      {
        path: '/sub/activities-2',
        component: () => import('../views/sub/activities-2.vue')
      },
      {
        path: '/sub/activities-3',
        component: () => import('../views/sub/activities-3.vue')
      },
      {
        path: '/sub/competition',
        component: () => import('../views/sub/competition.vue')
      },
      {
        path: '/sub/competition-2',
        component: () => import('../views/sub/competition-2.vue')
      },
      {
        path: '/sub/competition-3',
        component: () => import('../views/sub/competition-3.vue')
      },
      {
        path: '/sub/activities-detail',
        component: () => import('../views/sub/activities-detail.vue')
      },
      {
        path: '/auth/join',
        component: () => import('../views/auth/join.vue')
      }
    ]
  },
  {
    path: '/post',
    component: () => import('../views/post')
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
