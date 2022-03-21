<template>
  <div id="study_wrap">
    <h3>스터디</h3>
    <div>
      <b-button class="activities-detail-team-btn" @click="onClickAddNew">스터디 모집 글쓰기</b-button>
      <div>
        <b-table
          small
          hover
          striped
          :items="studyList"
          :fields="studyFields"
          selectable
          style="margin-bottom: 70px"
          @row-selected="onRowSelected"
        >
          <template #cell(nickname)="row">
            {{ row.item.User && row.item.User.nickname }}
          </template>
          <template #cell(name)="row">
            {{ row.item.Category && row.item.Category.name }}
          </template>
          <template #cell(title)="row">
            {{ row.item.title }}
          </template>
          <template #cell(createdAt)="row">
            {{ row.item.createdAt.substring(0, 10) }}
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
    </div>
    <inform />
  </div>
</template>

<script>
import inform from './inform.vue'

export default {
  components: {
    inform
  },
  data() {
    return {
      studyFields: [
        {
          key: 'nickname',
          label: '작성자'
        },
        {
          key: 'title',
          label: '제목'
        },
        {
          key: 'createdAt',
          label: '등록일'
        }
      ],
      search: {
        boardId: 1
      }
    }
  },
  computed: {
    studyList() {
      return this.$store.getters.StudyList
    },
    insertedResult() {
      return this.$store.getters.StudyInsertedResult
    },
    updatedResult() {
      return this.$store.getters.StudyUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.StudyDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      console.log(value)
      // 등록 후 처리
      if (value !== null) {
        if (value !== 0) {
          // 등록이 성공한 경우

          // 1. 메시지 출력
          alert('등록되었습니다!')

          // 2. 리스트 재검색
          this.searchStudyList()
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
            this.searchStudyList()
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
    this.searchStudyList()
  },
  methods: {
    searchStudyList() {
      this.$store.dispatch('actStudyList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actStudyInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actStudyInit')

      // 3. 로그인 여부 체크 후 모달 출력
      if (window.localStorage.token) {
        return this.$root.$emit('bv::show::modal', 'modal-post-inform')
      } else {
        alert('로그인을 한 후 이용해주세요.')
        return false
      }
    },
    onClickEdit(id) {
      // (수정을 위한) 상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actStudyInputMode', 'update')

      // 2. 상세정보 초기화
      this.$store.dispatch('actStudyInit', id)

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-post-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$byModal.msgBoxConfirm('삭제하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actStudyDelete', id)
        }
      })
    },
    isMyContent(userId) {
      // 해당 컨텐츠의 작성자 일치 여부
      if (userId === this.$store.getters.TokenUser.userid) {
        return true
      } else {
        return false
      }
    },
    onRowSelected() {
      this.$router.push('/sub/study/study-detail')
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
