import api from '../apiUtil'
import axios from 'axios'

// 초기값 선언
const stateInit = {
  Study: {
    id: null,
    userId: null,
    boardId: null,
    categoryId: null,
    nickName: null,
    title: null,
    content: null,
    tag: null,
    images: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    StudyList: [],
    Study: { ...stateInit.Study },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update),
  },
  getters: {
    StudyList: state => state.StudyList,
    Study: state => state.Study,
    StudyInsertedResult: state => state.InsertedResult,
    StudyUpdatedResult: state => state.UpdatedResult,
    StudyDeletedResult: state => state.DeletedResult,
    StudyInputMode: state => state.InputMode
  },
  mutations: {
    setStudyList(state, data) {
      state.StudyList = data
    },
    setStudy(state, data) {
      state.Study = data
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
    actStudyList(context, payload) {
      /* RestAPI 호출 */
      api
        .get(`/serverApi/posts?boardId=1`, { params: payload })
        // .get(`/serverApi/posts?boardId=1`, payload)
        .then(response => {
          const studyList = response && response.data && response.data.rows
          context.commit('setStudyList', studyList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('StudyList.error', error)
          context.commit('setStudyList', [])
        })
    },
    // 입력
    actStudyInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      console.log('study', payload)
      /* RestAPI 호출 */
      axios
        .post(`/serverApi/posts?boardId=1`, payload)
        .then(response => {
          // 정상 등록인 경우 처리
          console.log('inser', response)
          const insertedResult = response && response.data
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('StudyInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 정보 초기화
    actStudyInit(context, payload) {
      context.commit('setStudy', { ...stateInit.Study })
    },
    // 입력모드 설정
    actStudyInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actStudyInfo(context, payload) {
      // 상태값 초기화
      context.commit('setStudy', { ...stateInit.Study })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/posts/${payload}`)
        .then(response => {
          console.log('ddd', response)
          const study = response && response.data
          context.commit('setStudy', study)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('PostInfo.error', error)
          context.commit('setPost', {})
        })
    },
    // 수정
    actStudyUpdate(context, payload) {
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
          console.error('PostUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actStudyDelete(context, payload) {
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
