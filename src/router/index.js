import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views'),
    children: [
      {
        path: '/',
        component: () => import('../views/home.vue')
      },
      {
        path: '/sub',
        component: () => import('../views/sub'),
        children: [
          {
            path: '/sub/activities',
            component: () => import('../views/sub/activities')
          },
          {
            path: '/sub/activities/activities-2',
            component: () => import('../views/sub/activities/activities-2.vue')
          },
          {
            path: '/sub/activities/activities-3',
            component: () => import('../views/sub/activities/activities-3.vue')
          },
          {
            path: '/sub/activities/activities-detail',
            component: () => import('../views/sub/activities/activities-detail.vue')
          },
          {
            path: '/sub/activities/activities-detail-2',
            component: () => import('../views/sub/activities/activities-detail-2.vue')
          },
          {
            path: '/sub/competition',
            component: () => import('../views/sub/competition')
          },
          {
            path: '/sub/competition/competition-2',
            component: () => import('../views/sub/competition/competition-2.vue')
          },
          {
            path: '/sub/competition/competition-3',
            component: () => import('../views/sub/competition/competition-3.vue')
          },
          {
            path: '/sub/competition/competition-detail',
            component: () => import('../views/sub/competition/competition-detail.vue')
          },
          {
            path: '/sub/competition/competition-detail-2',
            component: () => import('../views/sub/competition/competition-detail-2.vue')
          },
          {
            path: '/sub/study',
            component: () => import('../views/sub/study')
          },
          {
            path: '/sub/study/study-detail',
            component: () => import('../views/sub/study/study-detail.vue')
          }
        ]
      }
    ]
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
        component: () => import('../views/auth/logout.vue'),
        meta: { header: false } // 로그인 페이지에선 헤더 제거
      },
      {
        path: '/auth/join',
        component: () => import('../views/auth/join.vue')
      },
      {
        path: '/auth/join-2',
        component: () => import('../views/auth/join-2.vue')
      }
    ]
  },
  {
    path: '/mypage',
    component: () => import('../views/mypage'),
    children: [
      {
        path: '/mypage',
        component: () => import('../views/mypage')
      },
      {
        path: '/mypage/inform',
        component: () => import('../views/mypage/inform.vue')
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
