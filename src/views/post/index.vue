<template>
  <div>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left" cols="3">
          <b-input-group class="mt-3">
            <b-form-input v-model="search.title" placeholder="제목 검색"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" size="sm" @click="searchPostList">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col style="text-align: right">
          <b-button variant="success" size="sm" @click="onClickAddNew">신규등록</b-button>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-table small hover striped :items="postList" :fields="fields">
        <template #cell(User)="row">
          {{ row.item.User && row.item.User.nickname }}
        </template>
        <template #cell(Category)="row">
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

    <!-- inform 영역 -->
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
      fields: [
        { key: 'User', label: '작성자' },
        { key: 'title', label: '제목' },
        { key: 'tag', label: '해시태그' },
        { key: 'Category', label: '카테고리' },
        { key: 'createdAt', label: '등록일시' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ],
      search: {
        title: null
      }
    }
  },
  computed: {
    postList() {
      return this.$store.getters.PostList
    },
    insertedResult() {
      return this.$store.getters.PostInsertedResult
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
      this.$store.dispatch('actPostInit')

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

<style src="../../sass/main.css"></style>
