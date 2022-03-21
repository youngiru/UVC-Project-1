import api from '../apiUtil'
import axios from 'axios'

// 초기값 선언
const stateInit = {
  Competition: {
    id: null,
    userId: null,
    categoryId: null,
    nickName: null,
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
    CompetitionList: [],
    Competition: { ...stateInit.Competition },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update),
  },
  getters: {
    CompetitionList: state => state.CompetitionList,
    Competition: state => state.Competition,
    CompetitionInsertedResult: state => state.InsertedResult,
    CompetitionUpdatedResult: state => state.UpdatedResult,
    CompetitionDeletedResult: state => state.DeletedResult,
    CompetitionInputMode: state => state.InputMode
  },
  mutations: {
    setCompetitionList(state, data) {
      state.CompetitionList = data
    },
    setCompetition(state, data) {
      state.Competition = data
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
    actCompetitionList(context, payload) {
      /* RestAPI 호출 */
      api
        .get('/serverApi/teams', { params: payload })
        .then(response => {
          const postList = response && response.data && response.data.rows
          context.commit('setCompetitionList', postList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('CompetitionList.error', error)
          context.commit('setCompetitionList', [])
        })
    },
    // 입력
    actCompetitionInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      console.log('post', payload)
      /* RestAPI 호출 */
      axios
        .post(`/serverApi/teams`, payload)
        .then(response => {
          // 정상 등록인 경우 처리
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('CompetitionInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 정보 초기화
    actCompetitionInit(context, payload) {
      context.commit('setCompetition', { ...stateInit.Competition })
    },
    // 입력모드 설정
    actCompetitionInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actCompetitionInfo(context, payload) {
      // 상태값 초기화
      context.commit('setCompetition', { ...stateInit.Competition })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/teams/${payload}`)
        .then(response => {
          console.log('ddd', response)
          const post = response && response.data
          context.commit('setCompetition', post)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('CompetitionInfo.error', error)
          context.commit('setCompetition', {})
        })
    },
    // 수정
    actCompetitionUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* RestAPI 호출 */
      api
        .put(`/serverApi/teams/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('CompetitionUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actCompetitionDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/teams/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('CompetitionDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
