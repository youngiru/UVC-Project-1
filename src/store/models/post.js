import api from '../apiUtil'
import axios from 'axios'

// 초기값 선언
const stateInit = {
  Post: {
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
    PostList: [],
    Post: { ...stateInit.Post },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update),
  },
  getters: {
    PostList: state => state.PostList,
    Post: state => state.Post,
    PostInsertedResult: state => state.InsertedResult,
    PostUpdatedResult: state => state.UpdatedResult,
    PostDeletedResult: state => state.DeletedResult,
    PostInputMode: state => state.InputMode
  },
  mutations: {
    setPostList(state, data) {
      state.PostList = data
    },
    setPost(state, data) {
      state.Post = data
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
    actPostList(context, payload) {
      console.log('PostList', payload)
      /* RestAPI 호출 */
      api
        .get('/serverApi/teams', { params: payload })
        .then(response => {
          console.log('listtestestestse', response)
          //여길 그냥 안들어와요 따른거 호출하는거같음
          const postList = response && response.data && response.data.rows
          console.log(response)
          context.commit('setPostList', postList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('PostList.error', error)
          context.commit('setPostList', [])
        })
    },
    // 입력
    actPostInsert(context, payload) {
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
          console.error('PostInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 정보 초기화
    actPostInit(context, payload) {
      context.commit('setPost', { ...stateInit.Post })
    },
    // 입력모드 설정
    actPostInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actPostInfo(context, payload) {
      // 상태값 초기화
      context.commit('setPost', { ...stateInit.Post })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/teams/${payload}`)
        .then(response => {
          console.log('ddd', response)
          const post = response && response.data
          context.commit('setPost', post)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('PostInfo.error', error)
          context.commit('setPost', {})
        })
    },
    // 수정
    actPostUpdate(context, payload) {
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
          console.error('PostUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actPostDelete(context, payload) {
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
          console.error('PostDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    },
    // 리스트 조회
    actActivityList(context, payload) {
      /* RestAPI 호출 */
      api
        .get('/serverApi/teams', { params: payload })
        .then(response => {
          const postList = response && response.data && response.data.rows
          context.commit('setPostList', postList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('actActivityList.error', error)
          context.commit('setPostList', [])
        })
    },
    // 입력
    actActivityInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      console.log('Activity', payload)
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
          console.error('ActivityInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 정보 초기화
    actActivityInit(context, payload) {
      context.commit('setPost', { ...stateInit.Post })
    },
    // 입력모드 설정
    actActivityInputMode(context, payload) {
      console.log('postInputmode', payload)
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actActivityInfo(context, payload) {
      // 상태값 초기화
      context.commit('setPost', { ...stateInit.Post })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/teams/${payload}`)
        .then(response => {
          const post = response && response.data
          context.commit('setPost', post)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('ActivityInfo.error', error)
          context.commit('setPost', {})
        })
    },
    // 수정
    actActivityUpdate(context, payload) {
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
          console.error('PostUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actActivityDelete(context, payload) {
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
          console.error('PostDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    },
    // 리스트 조회
    actCompetitionList(context, payload) {
      /* RestAPI 호출 */
      api
        .get('/serverApi/teams', { params: payload })
        .then(response => {
          const competitionList = response?.data?.rows || null
          console.log('test', response, competitionList)
          context.commit('setPostList', competitionList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('actCompetitionList.error', error)
          context.commit('setPostList', [])
        })
    },
    // 입력
    actCompetitionInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      console.log('Competition', payload)
      /* RestAPI 호출 */
      axios
        .post(`/serverApi/teams`, payload)
        .then(response => {
          // 정상 등록인 경우 처리
          const insertedResult = response && response.data && response.data.id
          console.log('insert', response)
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
      context.commit('setPost', { ...stateInit.Post })
    },
    // 입력모드 설정
    actCompetitionInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actCompetitionInfo(context, payload) {
      // 상태값 초기화
      context.commit('setPost', { ...stateInit.Post })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/teams/${payload}`)
        .then(response => {
          const competition = response && response.data
          context.commit('setPost', competition)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('CompetitionInfo.error', error)
          context.commit('setPost', {})
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
          console.error('PostUpdate.error', error)
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
          console.error('PostDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    },
    // 리스트 조회
    actStudyList(context, payload) {
      /* RestAPI 호출 */
      api
        .get('/serverApi/teams', { params: payload })
        .then(response => {
          const studyList = response && response.data && response.data.rows
          context.commit('setPostList', studyList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('actStudyList.error', error)
          context.commit('setPostList', [])
        })
    },
    // 입력
    actStudyInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      console.log('Study', payload)
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
          console.error('StudyInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },

    // 정보 초기화
    actStudyInit(context, payload) {
      context.commit('setPost', { ...stateInit.Post })
    },
    // 입력모드 설정
    actStudyInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actStudyInfo(context, payload) {
      // 상태값 초기화
      context.commit('setPost', { ...stateInit.Post })

      /* RestAPI 호출 */
      axios
        .get(`/serverApi/teams/${payload}`)
        .then(response => {
          const study = response && response.data
          context.commit('setPost', study)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('StudyInfo.error', error)
          context.commit('setPost', {})
        })
    },
    // 수정
    actStudyUpdate(context, payload) {
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
          console.error('StudyUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actStudyDelete(context, payload) {
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
          console.error('StudyDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
