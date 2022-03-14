<template>
  <div id="index_warp">
    <div class="index_main_img">
      <img src="@/assets/img/main_img.png" />
    </div>
    <div class="index_activities">
      <span>대외할동</span>
      <ul class="index_activities_imgbox">
        <li>
          <router-link to="/sub/activities/activities-detail">
            <img src="@/assets/img/test_img.jpg" />
          </router-link>
        </li>
        <li>
          <img src="@/assets/img/test_img.jpg" />
        </li>
        <li>
          <img src="@/assets/img/test_img.jpg" />
        </li>
        <li>
          <img src="@/assets/img/test_img.jpg" />
        </li>
      </ul>
    </div>
    <div class="index_competition">
      <span>공모전</span>
      <ul class="index_competition_imgbox">
        <li>
          <router-link to="/sub/competition/competition-detail">
            <img src="@/assets/img/test_img.jpg" />
          </router-link>
        </li>
        <li>
          <img src="@/assets/img/test_img.jpg" />
        </li>
        <li>
          <img src="@/assets/img/test_img.jpg" />
        </li>
        <li>
          <img src="@/assets/img/test_img.jpg" />
        </li>
      </ul>
    </div>
    <div class="index_study">
      <span>스터디</span>
      <b-table striped hover :items="items" :fields="fields" style="text-align: center">
        <template #cell(time)="row">
          {{ row.item.time.substring(0, 10) }}
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        { key: 'name', label: '작성자' },
        { key: 'title', label: '제목' },
        { key: 'time', label: '날짜' }
      ],
      items: [
        { isActive: true, time: '2021-02-25T00:00:00.000Z', name: '박정혜', title: '스터디 모집합니다.' },
        { isActive: false, time: '2021-02-25T00:00:00.000Z', name: '최송이', title: '같이 스터디하실분 모집합니다.' },
        { isActive: false, time: '2021-02-25T00:00:00.000Z', name: '김경은', title: '같이 공부해요' },
        { isActive: true, time: '2021-02-25T00:00:00.000Z', name: '김영일', title: '스터디 모집' }
      ]
    }
  }
}
</script>
<style src="@/sass/main.css"></style>
