<template>
  <div>
    <div id="login_wrap">
      <h3>로그인</h3>
      <div>
        <b-form @submit.stop.prevent>
          <label for="text-password">Password</label>
          <b-form-input id="text-id" type="text" aria-describedby="id-help-block"></b-form-input>
          <b-form-input id="text-password" type="password" aria-describedby="password-help-block"></b-form-input>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
