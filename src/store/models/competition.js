import api from '../apiUtil'
import axios from 'axios'

// 초기값 선언
const stateInit = {
  Competition: {
    id: null,
    userId: null,
    categoryId: null,
    title: null,
    content: null,
    tag: null, // 지역 태그
    images: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    ActivityList: [],
    Activity: { ...stateInit.Activity },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update),
  },
  getters: {
    ActivityList: state => state.ActivityList,
    Activity: state => state.Activity,
    ActivityInsertedResult: state => state.InsertedResult,
    ActivityUpdatedResult: state => state.UpdatedResult,
    ActivityDeletedResult: state => state.DeletedResult,
    ActivityInputMode: state => state.InputMode
  },
  mutations: {
    setActivityList(state, data) {
      state.ActivityList = data
    },
    setActivity(state, data) {
      state.Activity = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 리스트 조회
    actActivityList(context, payload) {
      console.log('PostList', payload)
      /* RestAPI 호출 */
      api
        .get('/serverApi/posts', { params: payload })
        .then(response => {
          console.log('list', response)
          const activityList = response && response.data && response.data.rows
          context.commit('setActivityList', activityList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ActivityList.error', error)
          context.commit('setActivityList', [])
        })
    },
    // 입력
    actActivityInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      console.log('Activity', payload)
      /* RestAPI 호출 */
      axios
        .post(`/serverApi/posts`, payload)
        .then(response => {
          // 정상 등록인 경우 처리
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ActivityInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 정보 초기화
    actActivityInit(context, payload) {
      context.commit('setActivity', { ...stateInit.Post })
    },
    // 입력모드 설정
    actActivityInputMode(context, payload) {
      console.log('actionInputmode', payload)
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actActivityInfo(context, payload) {
      // 상태값 초기화
      context.commit('setActivity', { ...stateInit.Post })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/posts/${payload}`)
        .then(response => {
          console.log('ddd', response)
          const post = response && response.data
          context.commit('setActivity', post)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ActivityInfo.error', error)
          context.commit('setActivity', {})
        })
    },
    // 수정
    actActivityUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* RestAPI 호출 */
      api
        .put(`/serverApi/posts/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ActivityUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actActivityDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/posts/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ActivityDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
