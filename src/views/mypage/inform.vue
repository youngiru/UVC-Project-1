<template>
  <div>
    <b-modal id="modal-mypage-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group label="이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="mypage.name" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="아이디" label-for="mypageid" label-cols="3">
          <b-form-input id="mypageid" v-model="mypage.mypageid" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="닉네임" label-for="mypageNicName" label-cols="3">
          <b-form-input id="mypageNicName" v-model="mypage.mypageNicName"></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호" label-for="password" label-cols="3">
          <b-form-input id="password" v-model="mypage.password" type="password"></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호 변경" label-for="updatedPwDate" label-cols="3">
          <b-form-input id="updatedPwDate" v-model="mypage.updatedPwDate" type="password"></b-form-input>
        </b-form-group>
        <b-form-group label="이메일" label-for="email" label-cols="3">
          <b-form-input id="email" v-model="mypage.email"></b-form-input>
        </b-form-group>
        <b-form-group label="전화번호" label-for="phone" label-cols="3">
          <b-form-input id="phone" v-model="mypage.phone"></b-form-input>
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
        name: null,
        mypageid: null,
        mypageNicName: null,
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
      return this.mypage.createdAt && this.mypage.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.mypage = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.mypage = { ...this.infoData }

    this.setDefaultValues() // 기본값 세팅
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actMypageInsert', this.mypage) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actMypageUpdate', this.mypage) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.mypage.role = this.mypageRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
