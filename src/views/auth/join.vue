<template>
  <div id="join_wrap">
    <span class="join_title">회원가입</span>
    <span class="join_top_line"></span>
    <b-container fluid style="width: 700px">
      <b-form-group id="join-name" label="이름" label-for="name">
        <b-form-input id="name" v-model="name" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group id="join-nickname" label="닉네임" label-for="nickname">
        <b-form-input id="nickname" v-model="nickname" required></b-form-input>
      </b-form-group>
      <b-form-group id="join-userid" label="아이디" label-for="userid">
        <b-form-input id="userid" v-model="userid" required></b-form-input>
      </b-form-group>
      <b-form-group id="join-password" label="비밀번호" label-for="password">
        <b-form-input id="password" v-model="password" required type="password"></b-form-input>
      </b-form-group>
      <b-form-group id="join-email" label="email" label-for="email">
        <b-form-input id="email" v-model="email" required></b-form-input>
      </b-form-group>
      <b-form-group id="join-phone" label="전화번호" label-for="phone">
        <b-form-input id="phone" v-model="phone" required></b-form-input>
      </b-form-group>
      <b-form-group id="join-address" label="지역" label-for="address">
        <input id="join_address" v-model="postcode" type="text" placeholder="우편번호" />
        <input id="join_address_btn" type="button" value="우편번호 찾기" @click="showApi()" /><br />
        <input id="address" v-model="address" type="text" placeholder="주소" /><br />
        <input id="detailAddress" v-model="detailAddress" type="text" placeholder="상세주소" />
      </b-form-group>
    </b-container>
    <input id="join_submit" type="submit" value="회원가입" @click="submit()" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nickname: '',
      userid: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      detailAddress: '',
      show: true
    }
  },
  methods: {
    showApi() {
      new window.daum.Postcode({
        oncomplete: data => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let fullRoadAddr = data.roadAddress // 도로명 주소 변수
          let extraRoadAddr = '' // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')'
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          this.postcode = data.zonecode //5자리 새우편번호 사용
          this.address = fullRoadAddr
        }
      }).open()
    },
    // 회원가입 제출 메소드
    submit() {
      setTimeout(() => {
        if (!this.name) {
          this.$bvToast.toast('이름을 입력하세요.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
          return 0
        }
        if (!this.nickname) {
          this.$bvToast.toast('닉네임을 입력하세요.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
          return 0
        }
        if (!this.password) {
          this.$bvToast.toast('비밀번호를 입력하세요.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
          return 0
        }
        if (!this.email) {
          this.$bvToast.toast('이메일을 입력하세요.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
          return 0
        }
        if (!this.phone) {
          this.$bvToast.toast('전화번호를 입력하세요.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
          return 0
        }
        if (!this.address) {
          this.$bvToast.toast('주소를 입력해주세요.', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
          return 0
        }
        if (!this.detailAddress) {
          this.$bvToast.toast('상세주소를 입력해주세요', {
            title: 'Fail',
            variant: 'danger',
            solid: true
          })
          return 0
        }

        this.$router.push('/')
        this.$store.dispatch('actUserInsert', this.user)
        // localStorage.removeItem('userRole')
      }, 1000)
    }
  }
}
</script>
