<template>
  <div>
    <div id="login_wrap">
      <div class="login_formbox">
        <b-container fluid>
          <b-form @submit.stop.prevent>
            <b-row align-h="center" class="login_id login_box">
              <b-col sm="7">
                <b-form-input
                  id="login_input"
                  v-model="userid"
                  type="text"
                  placeholder="모여 아이디"
                  aria-describedby="id-help-block"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row align-h="center" class="login_pw login_box">
              <b-col sm="7">
                <b-form-input
                  id="input-password"
                  v-model="password"
                  type="password"
                  placeholder="비밀번호"
                  aria-describedby="password-help-block"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-form>
        </b-container>
      </div>
      <div class="login_btnbox">
        <b-button variant="outline-warning" :disabled="loading" class="login_btn" @click="onSubmit"
          ><b-spinner v-if="loading" small></b-spinner>로그인</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      userid: null,
      password: null
    }
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser
    },
    loading() {
      return this.$store.getters.TokenLoading
    },
    error() {
      return this.$store.getters.TokenError
    }
  },
  watch: {
    tokenUser(value) {
      if (value && value.id && value.id > 0) {
        console.log('tokenuser', value)
        // 로그인이 완료된 상황
        this.$router.push('/') // 메인 페이지 이동
      }
    },
    error(errValue) {
      if (errValue !== null) {
        // 메세지 출력
        this.$bvToast.toast('아이디/비밀번호를 확인해 주세요.', {
          title: '로그인 에러',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  created() {
    // 이미 토큰을 가지고 있는 경우 처리를 위한 로직
    const token = window.localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const today = new Date()
      const expDate = new Date(decodedToken.exp * 1000)

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우
        this.$router.push('/') // 메인 페이지 이동
      } else {
        // 토큰이 만료된 경우
        window.localStorage.removeItem('token') // 토큰 삭제
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('authLogin', { userid: this.userid, password: this.password })
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
