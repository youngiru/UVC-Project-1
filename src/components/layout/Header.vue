<template>
  <div id="header">
    <div class="header_u_af">
      <ul class="header_u">
        <li><router-link to="/auth/login" class="color_000">로그인</router-link></li>
        <li><router-link to="/auth/join" class="color_000">회원가입</router-link></li>
      </ul>
    </div>
    <h1>
      <router-link to="/">
        <img src="../../assets/img/Free_Sample_By_Wix (5).png" />
      </router-link>
    </h1>
    <nav class="header_nev">
      <ul class="header_nev_ul">
        <li>커뮤니티</li>
        <li><router-link to="/sub/activities" class="color_000">대외활동</router-link></li>
        <li><router-link to="/sub/competition" class="color_000">공모전</router-link></li>
        <li><router-link to="/sub/study" class="color_000">스터디</router-link></li>
        <li href="#" @click="$router.push('/post')">팀원 모집</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {}
</script>
