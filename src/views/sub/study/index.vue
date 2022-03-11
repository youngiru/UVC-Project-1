<template>
  <div id="study_wrap">
    <h3>스터디</h3>
    <div>
      <b-button class="study-detail-team-btn" @click="onClickAddNew">팀원 모집 글쓰기</b-button>
      <div>
        <b-table small hover striped :items="postList" :fields="studyFields" style="margin-bottom: 70px">
          <!-- <template #cell(id)="row">
            {{ row.item.id && row.item.User.nickname }}
          </template>
          <template #cell(Category)="row">
            {{ row.item.Category && row.item.Category.name }}
          </template>
          <template #cell(createdAt)="row">
            {{ row.item.createdAt.substring(0, 10) }}
          </template> -->
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
      :fields="study"
      style="margin-bottom: 70px"
      selectable
      @row-selected="onRowSelected"
    >
    </b-table>
    <inform />
  </div>
</template>

<script>
import inform from '../../post/inform.vue'

export default {
  components: {
    inform
  },
  data() {
    return {
      // studyFields: [
      //   {
      //     key: 'id',
      //     label: '번호'
      //   },
      //   {
      //     key: 'name',
      //     label: '작성자'
      //   },
      //   {
      //     key: 'title',
      //     label: '제목'
      //   }
      // ],
      // 테스트 데이터
      study_data: [
        { 번호: 1, 작성자: '김영일', 제목: '스터디' },
        { 번호: 2, 작성자: '이학수', 제목: '스터디 모집' },
        { 번호: 3, 작성자: '윤희영', 제목: '스터디 같이 해요' },
        { 번호: 4, 작성자: '김경은', 제목: '스터디 모집합니다' },
        { 번호: 5, 작성자: '이주현', 제목: '스터디' },
        { 번호: 6, 작성자: '진정우', 제목: '모집' },
        { 번호: 7, 작성자: '이다운', 제목: '같이해요' },
        { 번호: 8, 작성자: '유지영', 제목: '스터디 할 사람' },
        { 번호: 9, 작성자: '최송이', 제목: '스터디 모집' },
        { 번호: 10, 작성자: '박정혜', 제목: '스터디 같이 해주세요' }
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
          this.$byToast.toast('등록되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

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
      this.$store.dispatch('actPostList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actPostInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actPostInit')

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-post-inform')
    },
    onClickEdit(id) {
      // (수정을 위한) 상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actPostInputMode', 'update')

      // 2. 상세정보 초기화
      this.$store.dispatch('actPostInit', id)

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-post-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$byModal.msgBoxConfirm('삭제하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actPostDelete', id)
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
