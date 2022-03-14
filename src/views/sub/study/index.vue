<template>
  <div id="study_wrap">
    <h3>스터디</h3>
    <div>
      <b-button class="activities-detail-team-btn" @click="onClickAddNew">팀원 모집 글쓰기</b-button>
      <div>
        <b-table small hover striped :items="postList" :fields="studyFields" style="margin-bottom: 70px">
          <template #cell(nickName)="row">
            {{ row.item.id && row.item.User.nickname }}
          </template>
          <template #cell(name)="row">
            {{ row.item.Category && row.item.Category.name }}
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
    <b-table
      striped
      hover
      :items="study_data"
      :fields="studyFields"
      style="margin-bottom: 70px"
      selectable
      @row-selected="onRowSelected"
    >
    </b-table>
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
          key: 'id',
          label: '번호'
        },
        {
          key: 'nickName',
          label: '작성자'
        },
        {
          key: 'title',
          label: '제목'
        }
      ],
      // 테스트 데이터
      study_data: [
        { id: 1, nickName: '김영일', title: '스터디' },
        { id: 2, nickName: '이학수', title: '스터디 모집' },
        { id: 3, nickName: '윤희영', title: '스터디 같이 해요' },
        { id: 4, nickName: '김경은', title: '스터디 모집합니다' },
        { id: 5, nickName: '이주현', title: '스터디' },
        { id: 6, nickName: '진정우', title: '모집' },
        { id: 7, nickName: '이다운', title: '같이해요' },
        { id: 8, nickName: '유지영', title: '스터디 할 사람' },
        { id: 9, nickName: '최송이', title: '스터디 모집' },
        { id: 10, nickName: '박정혜', title: '스터디 같이 해주세요' }
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
      if (userId === this.$store.getters.TokenUser.id) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
