<template>
  <div id="detail2_wrap">
    <h3>팀원모집</h3>
    <div class="detail2-table">
      <form action="">
        <table>
          <tr>
            <th>제목</th>
            <td>팀원모집합니다.</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>서포터즈 팀원을 모집합니다.</td>
          </tr>
        </table>
      </form>
    </div>
    <div class="detail2-textareabox">
      <span>댓글</span>
      <b-form-textarea
        id="textarea-no-resize"
        v-model="teamCmt.content"
        placeholder="댓글을 입력해주세요"
        :rows="3"
        no-resize
        class="detail2-textarea"
      ></b-form-textarea>
      <b-button type="submit" variant="primary" @click="addCmt"> 완료</b-button>
    </div>
    <div>
      <b-table small hover striped :items="teamCmtList" :fields="teamCmtfields" style="margin-bottom: 70px">
        <template #cell(nickname)="row">
          {{ row.item.User && row.item.User.nickname }}
        </template>
        <template #cell(content)="row">
          {{ row.item.content }}
        </template>
        <template #cell(updateBtn)="row">
          <!-- 본인 컨텐츠만 수정 가능 -->
          <b-button v-if="isMyContent(row.item.userId)" size="sm" variant="success" @click="onClickEdit(row.item.id)"
            >수정</b-button
          >
          <b-button v-else size="sm" variant="info" @click="onClickEdit(row.item.id)">보기</b-button>
        </template>
        <template #cell(deleteBtn)="row">
          <!-- 본인 컨텐츠만 삭제 가능 -->
          <b-button v-if="isMyContent(row.item.userId)" size="sm" variant="danger" @click="onClickDelete(row.item.id)"
            >삭제</b-button
          >
        </template>
      </b-table>
    </div>
    <div class="detail2-btn">
      <button><router-link to="/sub/activities/activities-detail-2" class="color_000">이전</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamCmtfields: [
        {
          key: 'nickname',
          label: '작성자'
        },
        {
          key: 'content',
          label: '댓글'
        },
        {
          key: 'createdAt',
          label: '등록일'
        }
      ],
      teamCmt: {
        id: null,
        teamId: 35,
        userId: 1,
        content: null,
        User: {
          id: 1,
          nickname: 'kim',
          userid: 'kim'
        },
        createdAt: null
      },
      search: {
        id: 35
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.TokenUser.nickname
    },
    teamCmtList() {
      return this.$store.getters.TeamCmtList
    },
    insertedResult() {
      return this.$store.getters.TeamCmtInsertedResult
    },
    updatedResult() {
      return this.$store.getters.TeamCmtUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.TeamCmtDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리
      if (value !== null) {
        if (value !== null) {
          // 등록이 성공한 경우

          // 1. 메시지 출력
          alert('등록되었습니다!')

          // 2. 리스트 재검색
          this.searchTeamCmtList()
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
            this.searchTeamCmtList()
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
    this.searchTeamCmtList()
  },
  methods: {
    searchTeamCmtList() {
      this.$store.dispatch('actTeamCmtList', this.search)
    },
    addCmt() {
      this.$store.dispatch('actTeamCmtInsert', this.teamCmt)

      // evt.preventDefault()
      // this.$axios.post(`${this.$cfg.path.api}data/comment`, this.formCmt)
      //   .then(res => {
      //     if (!res.data.success) throw new Error(res.data.msg)
      //     return this.swalSuccess('댓글 추가 완료')
      //   })
      //   .then(() => {
      //     this.$refs.mdAddCmt.hide()
      //     this.refresh()
      //   })
      //   .catch(err => {
      //     this.swalError(err.message)
      //   })
    },
    modCmt() {
      this.$swal({
        title: '댓글 수정 변경',
        dangerMode: true,
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '수정'
          }
        }
      })
        .then(res => {
          if (!res) throw new Error('')
          return this.$axios.put(`${this.$cfg.path.api}data/comment`, this.formCmt)
        })
        .then(res => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('댓글 수정 완료')
        })
        .then(() => {
          this.$refs.mdModCmt.hide()
          this.refresh()
        })
        .catch(err => {
          if (err.message) this.swalError(err.message)
          else this.swalWarning('댓글 수정 취소')
        })
    },
    delCmt(cmt) {
      this.$swal({
        title: '댓글 삭제',
        dangerMode: true,
        buttons: {
          cancel: {
            text: '취소',
            visible: true
          },
          confirm: {
            text: '삭제'
          }
        }
      })
        .then(res => {
          if (!res) throw new Error('')
          return this.$axios.delete(`${this.$cfg.path.api}data/comment`, {
            params: { _id: cmt._id }
          })
        })
        .then(res => {
          if (!res.data.success) throw new Error(res.data.msg)
          return this.swalSuccess('댓글 삭제 완료')
        })
        .then(() => {
          this.refresh()
        })
        .catch(err => {
          if (err.message) return this.swalError(err.message)
          this.swalWarning('댓글 삭제 취소')
        })
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
