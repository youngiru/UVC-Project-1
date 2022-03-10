<template>
  <div>
    <b-modal id="modal-mypage-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="mypage.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="mypage.name"></b-form-input>
        </b-form-group>
        <b-form-group label="아이디" label-for="mypageid" label-cols="3">
          <b-form-input id="mypageid" v-model="mypage.mypageid"></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호" label-for="password" label-cols="3">
          <b-form-input
            v-if="inputMode === 'insert'"
            id="password"
            v-model="mypage.password"
            type="password"
          ></b-form-input>
          <b-button v-if="inputMode === 'update'" variant="danger">비밀번호 변경</b-button>
        </b-form-group>
        <b-form-group label="권한" label-for="auth" label-cols="3">
          <b-form-radio-group id="auth" v-model="mypage.role" :options="mypageRole.options" />
        </b-form-group>
        <b-form-group label="이메일" label-for="email" label-cols="3">
          <b-form-input id="email" v-model="mypage.email"></b-form-input>
        </b-form-group>
        <b-form-group label="전화번호" label-for="phone" label-cols="3">
          <b-form-input id="phone" v-model="user.phone"></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mypage: {
        id: null,
        name: null,
        mypageid: null,
        password: null,
        email: null,
        phone: null,
        updatedPwDate: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Mypage
    },
    inputMode() {
      return this.$store.getters.MypageInputMode
    },
    getCreatedAt() {
      return this.Mypage.createdAt && this.Mypage.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.Mypage = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.Mypage = { ...this.infoData }

    this.setDefaultValues() // 기본값 세팅
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actMypageInsert', this.Mypage) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actMypageUpdate', this.Mypage) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.Mypage.role = this.MypageRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
