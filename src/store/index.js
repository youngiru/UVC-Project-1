import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './models/auth'
import Post from './models/post'
import User from './models/user'
import Mypage from './models/mypage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Post,
    User,
    Mypage
  }
})
