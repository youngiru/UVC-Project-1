<template>
  <div id="header">
    <div class="header_u_af">
      <ul class="header_u">
        <li><router-link to="/auth/login" class="color_000">로그인</router-link></li>
        <li><router-link to="/auth/join" class="color_000">회원가입</router-link></li>
        <li><router-link to="/mypage" class="color_000">마이페이지</router-link></li>
      </ul>
    </div>
    <h1>
      <router-link to="/">
        <img src="../../assets/img/Free_Sample_By_Wix (5).png" />
      </router-link>
    </h1>
    <nav class="header_nev">
      <ul class="header_nev_ul">
        <li><router-link to="/sub/activities" class="color_000">대외활동</router-link></li>
        <li><router-link to="/sub/competition" class="color_000">공모전</router-link></li>
        <li><router-link to="/sub/study" class="color_000">스터디</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedin() {
      // let login = false
      // if (this.$store.getters.TokenUser && this.$store.getters.TokenUser.id > 0) {
      //   login = true
      // }

      // return login
      // 테스트 return true
      return true
    },
    tokenUserName() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.name
    }
  },
  methods: {
    onClick(path) {
      this.$router.push(path)
    }
  }
}
</script>
