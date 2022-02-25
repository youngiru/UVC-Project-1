<template>
  <div id="index_warp">
    <app-header />
    <div class="index_main_img">
      <img src="./assets/img/main_img.png" />
    </div>
    <div></div>
  </div>
</template>

<script>
import Header from './components/layout/Header'

export default {
  components: {
    'app-header': Header
  }
}
</script>
