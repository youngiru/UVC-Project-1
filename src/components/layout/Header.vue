<template>
  <div id="header">
    <div class="header_u_af">
      <ul class="header_u">
        <li>
          <!-- <router-link to="/auth/logout" class="color_000">{{ getLogin }}</router-link> -->
        </li>
        <li class="util_btn" @click="log">{{ getLogin }}</li>
        <li class="util_btn" @click="onRowUtil">{{ getUtil }}</li>
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
    <b-navbar toggleable="lg" type="light" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1)">
      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="isLoggedin" class="ml-auto">
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <em>{{ tokenUserName }}</em>
        </template>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedin() {
      let login = false
      if (window.localStorage.token) {
        login = true
      }

      return login
    },
    tokenUserName() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.name
    },
    getLogin() {
      let log = ''
      if (window.localStorage.token) {
        log = '로그아웃'
      } else {
        log = '로그인'
      }

      return log
    },
    getUtil() {
      let text = ''
      if (window.localStorage.token) {
        text = '마이페이지'
      } else {
        text = '회원가입'
      }

      return text
    }
  },
  methods: {
    log() {
      if (window.localStorage.token) {
        this.$router.push('/auth/logout')
      } else {
        this.$router.push('/auth/login')
      }
    },
    onRowUtil() {
      if (window.localStorage.token) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/auth/join-2')
      }
    }
  }
}
</script>
