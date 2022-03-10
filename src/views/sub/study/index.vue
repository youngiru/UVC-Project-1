<template>
  <div id="study_wrap">
    <h3>스터디</h3>
    <b-table
      striped
      hover
      :items="study_data"
      :fields="study"
      style="margin-bottom: 70px"
      selectable
      @row-selected="onRowSelected"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      study: [
        {
          key: 'id',
          label: '번호'
        },
        {
          key: 'name',
          label: '작성자'
        },
        {
          key: 'title',
          label: '제목'
        }
      ],
      study_data: [
        { id: 1, name: '김영일', title: '스터디' },
        { id: 2, name: '이학수', title: '스터디 모집' },
        { id: 3, name: '윤희영', title: '스터디 같이 해요' },
        { id: 4, name: '김경은', title: '스터디 모집합니다' },
        { id: 5, name: '이주현', title: '스터디' },
        { id: 6, name: '진정우', title: '모집' },
        { id: 7, name: '이다운', title: '같이해요' },
        { id: 8, name: '유지영', title: '스터디 할 사람' },
        { id: 9, name: '최송이', title: '스터디 모집' },
        { id: 10, name: '박정혜', title: '스터디 같이 해주세요' }
      ]
    }
  },
  methods: {
    onRowSelected() {
      this.$router.push('/sub/study/study-detail')
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
