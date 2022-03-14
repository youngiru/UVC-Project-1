<template>
  <div id="study-detail_wrap">
    <h3>팀원모집</h3>
    <div class="study-detail-table">
      <form action="">
        <table>
          <tr>
            <th>제목</th>
            <td>팀원모집합니다.</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>알고리즘 스터디 팀원을 모집합니다.</td>
          </tr>
        </table>
      </form>
    </div>
    <div class="study-detail-textareabox">
      <span>댓글</span>
      <b-form-textarea
        id="textarea-no-resize"
        placeholder="댓글을 입력해주세요"
        rows="3"
        no-resize
        class="study-detail-textarea"
      ></b-form-textarea>
      <button @click="onClickAddNew">완료</button>
    </div>
    <div class="study-detail-btn">
      <button><router-link to="/sub/study" class="color_000">이전</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      field: [
        {
          key: 'id',
          label: '번호'
        },
        {
          key: 'nickName',
          label: '작성자'
        },
        {
          key: 'content',
          label: '내용'
        }
      ]
    }
  },
  computed: {
    postList() {
      return this.$store.getters.PostList
    },
    insertedResult() {
      return this.$store.getters.PostInsertedResult
    },
    updatedResult() {
      return this.$store.getters.PostUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.PostDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메시지 출력
          // this.$byToast.toast('등록되었습니다.', {
          //   title: 'SUCCESS',
          //   variant: 'success',
          //   solid: true
          // })
          alert('등록되었습니다!')

          // 2. 리스트 재검색
          this.searchPostList()
        } else {
          // 등록이 실패한 경우

          // 메시지 출력
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          if (value > 0) {
            // 수정이 성공한 경우

            // 1. 메시지 출력
            this.$byToast.toast('수정되었습니다.', {
              title: 'SUCCESS',
              variant: 'success',
              solid: true
            })

            // 2. 리스트 재검색
            this.searchPostList()
          } else {
            // 수정이 실패한 경우

            // 메시지 출력
            this.$byToast.toast('수정이 실패하였습니다.', {
              title: 'ERROR',
              variant: 'danger',
              solid: true
            })
          }
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메시지 출력
          this.$$byToast.toast('삭제되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchPostList()
  },
  methods: {
    onRowSelected() {
      this.$router.push('/sub/study/study-detail')
    },
    searchPostList() {
      this.$store.dispatch('actStudyList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actStudyInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actStudyInit')

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-post-inform')
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
