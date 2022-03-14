<template>
  <div id="mypage_wrap">
    <h3>마이페이지</h3>
    <div class="mypage-mainbox">
      <span class="mypage_title">회원정보</span>
      <!-- 테스트 데이터 -->
      <b-container>
        <b-row>
          <b-col cols="3" class="mypage_imgbox">
            <img src="@/assets/img/THUMBNAIL.jpg" alt="" class="mypage_img" />
          </b-col>
          <b-col cols="9" class="mypage_textbox">
            <div class="mypage_information">
              <span class="mypage_inform_text">이름</span>
              <span>홍길동</span>
              <br />
              <span class="mypage_inform_text">닉네임</span>
              <span>사람</span>
              <br />
              <span class="mypage_inform_text">email</span>
              <span>example@email.com</span>
              <br />
              <span class="mypage_inform_text">전화번호</span>
              <span>010-0000-0000</span>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <div class="mypage_inform_btnbox">
        <b-button v-b-modal.modal-1 class="mypage_inform_btn" @click="onClickEdit(row.item.User.id)">정보수정</b-button>
      </div>
    </div>

    <!-- inform 영역 -->
    <inform />
  </div>
</template>

<script>
import inform from './inform.vue'

export default {
  components: {
    inform: inform
  },
  data() {
    return {
      userid: null
    }
  },
  computed: {
    MypageList() {
      return this.$store.getters.MypageList
    },
    updatedResult() {
      return this.$store.getters.MypageUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.MypageDeletedResult
    }
  },
  watch: {
    updatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          //수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchMypageList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    daletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          //삭제가 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchMypageList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchMypageList()
  },
  methods: {
    searchMypageList() {
      this.$store.dispatch('actMypageList')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actMypageInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actMypageInfo', id)

      // 3. 모달 출력
      // this.$bvModal.show('modal-mypage-inform')
      this.$root.$emit('bv::show::modal', 'modal-mypage-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actMypageDelete', id)
        }
      })
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
