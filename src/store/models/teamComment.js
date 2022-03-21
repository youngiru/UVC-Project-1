import api from '../apiUtil'
import axios from 'axios'

// 초기값 선언
const stateInit = {
  TeamCmt: {
    id: null,
    teamId: null,
    userId: null,
    content: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    TeamCmtList: [],
    TeamCmt: { ...stateInit.TeamCmt },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null // 삭제처리 후 결과
  },
  getters: {
    TeamCmtList: state => state.TeamCmtList,
    TeamCmt: state => state.TeamCmt,
    TeamCmtInsertedResult: state => state.InsertedResult,
    TeamCmtUpdatedResult: state => state.UpdatedResult,
    TeamCmtDeletedResult: state => state.DeletedResult
  },
  mutations: {
    setTeamCmtList(state, data) {
      state.TeamCmtList = data
    },
    setTeamCmt(state, data) {
      state.TeamCmt = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    }
  },
  actions: {
    // 리스트 조회
    actTeamCmtList(context, payload) {
      /* RestAPI 호출 */
      api
        .get(`/serverApi/teams/${payload.id}`)
        .then(response => {
          const teamCmtList = response && response.data && response.data && response.data.Teamcomments
          console.log('teamCmtList', response.data)
          context.commit('setTeamCmtList', teamCmtList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('TeamCmtList.error', error)
          context.commit('setTeamCmtList', [])
        })
    },
    // 입력
    actTeamCmtInsert(context, payload) {
      console.log(payload)
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      /* RestAPI 호출 */
      axios
        .post(`/serverApi/teams/${payload.teamId}`, payload)
        .then(response => {
          // 정상 등록인 경우 처리
          const insertedResult = response && response.data
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('TeamCmtInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 정보 초기화
    actTeamCmtInit(context, payload) {
      context.commit('setTeamCmt', { ...stateInit.TeamCmt })
    },
    // 상세정보 조회
    actTeamCmtInfo(context, payload) {
      // 상태값 초기화
      context.commit('setTeamCmt', { ...stateInit.TeamCmt })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/posts/${payload}`)
        .then(response => {
          console.log('ddd', response)
          const teamCmt = response && response.data
          context.commit('setTeamCmt', teamCmt)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('TeamCmtInfo.error', error)
          context.commit('setTeamCmtInfo', -1)
        })
    },
    // 수정
    actTeamCmtUpdate(context, payload) {
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
          console.error('TeamCmtUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actTeamCmtDelete(context, payload) {
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
          console.eror('PostDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
