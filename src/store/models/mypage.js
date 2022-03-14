import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Mypage: {
    id: null,
    name: null,
    nickname: null,
    userid: null,
    password: null,
    email: null,
    phone: null,
    updatedPwDate: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    MypageList: [],
    Mypage: { ...stateInit.Mypage },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null
  },
  getters: {
    MypageList: state => state.MypageList,
    Mypage: state => state.Mypage,
    MypageInsertedResult: state => state.InsertedResult,
    MypageUpdatedResult: state => state.UpdatedResult,
    MypageDeletedResult: state => state.DeletedResult,
    MypageInputMode: state => state.InputMode
  },
  mutations: {
    setMypageList(state, data) {
      state.MypageList = data
    },
    setMypage(state, data) {
      state.Mypage = data
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
    actMypageList(context, payload) {
      /* 테스트 데이터 세팅 */
      const MypageList = [
        {
          id: 1,
          name: '홍길동',
          nickname: '사람',
          userid: 'hong',
          password: '1234',
          email: 'hong@email.com',
          phone: '010-9876-5432'
        },
        {
          id: 2,
          name: '김길동',
          nickname: '사람1',
          userid: 'kim',
          password: '1234',
          email: 'kim@email.com',
          phone: '010-9876-5432'
        }
      ]
      context.commit('setMypageList', MypageList)

      /* RestAPI 호출 */
      // api
      //   .get('/serverApi/Mypages')
      //   .then(response => {
      //     const MypageList = response && response.data
      //     context.commit('setMypageList', MypageList)
      //   })
      //   .catch(error => {
      //     // 에러인 경우 처리
      //     console.error('MypageList.error', error)
      //     context.commit('setMypageList', [])
      //   })
    },
    // 등록
    actMypageInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* 테스트 데이터 세팅 */
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      // api
      //   .post('/serverApi/Mypages', payload)
      //   .then(response => {
      //     const insertedResult = response && response.data && response.data.id
      //     context.commit('setInsertedResult', insertedResult)
      //   })
      //   .catch(error => {
      //     // 에러인 경우 처리
      //     console.error('MypageInsert.error', error)
      //     context.commit('setInsertedResult', -1)
      //   })
    },
    // 초기화
    actMypageInit(context, payload) {
      context.commit('setMypage', { ...stateInit.Mypage })
    },
    // 입력모드
    actMypageInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actMypageInfo(context, payload) {
      // 상태값 초기화
      context.commit('setMypage', { ...stateInit.Mypage })

      /* 테스트 데이터 세팅 */

      setTimeout(() => {
        const MypageList = [
          {
            id: 1,
            name: '홍길동',
            nickname: '사람',
            userid: 'hong',
            password: '1234',
            email: 'hong@email.com',
            phone: '010-9876-5432'
          },
          {
            id: 2,
            name: '김길동',
            nickname: '사람1',
            userid: 'kim',
            password: '1234',
            email: 'kim@email.com',
            phone: '010-9876-5432'
          }
        ]

        let Mypage = { ...stateInit.Mypage }
        for (let i = 0; i < MypageList.length; i += 1) {
          if (payload === MypageList[i].id) {
            Mypage = { ...MypageList[i] }
          }
        }
        context.commit('setMypage', Mypage)
      }, 300)

      /* RestAPI 호출 */
      // api
      //   .get(`/serverApi/Mypages/${payload}`)
      //   .then(response => {
      //     const Mypage = response && response.data
      //     context.commit('setMypage', Mypage)
      //   })
      //   .catch(error => {
      //     // 에러인 경우 처리
      //     console.error('MypageInfo.error', error)
      //     context.commit('setMypage', -1)
      //   })
    },
    // 수정
    actMypageUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* 테스트 데이터 세팅 */

      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      // api
      //   .put(`/serverApi/Mypages/${payload.id}`, payload)
      //   .then(response => {
      //     const updatedResult = response && response.data && response.data.length > 0 && response.data[0]
      //     context.commit('setUpdatedResult', updatedResult)
      //   })
      //   .catch(error => {
      //     // 에러인 경우 처리
      //     console.error('MypageUpdate.error', error)
      //     context.commit('setUpdatedResult', -1)
      //   })
    },
    // 삭제
    actMypageDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* 테스트 데이터 세팅 */

      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.

      /* RestAPI 호출 */
      // api
      //   .delete(`/serverApi/Mypages/${payload}`)
      //   .then(response => {
      //     const deletedResult = response && response.data
      //     context.commit('setDeletedResult', deletedResult)
      //   })
      //   .catch(error => {
      //     // 에러인 경우 처리
      //     console.error('MypageDelete.error', error)
      //     context.commit('setDeletedResult', -1)
      //   })
    }
  }
}
