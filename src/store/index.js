import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './models/auth'
import Post from './models/post'
import Activity from './models/activities'
import Competition from './models/competition'
import Study from './models/study'
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
    Activity,
    Competition,
    Study,
    User,
    Mypage
  }
})
