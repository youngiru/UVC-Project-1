<template>
  <div id="activities_wrap">
    <h3>대외활동</h3>
    <div class="menu-nav">
      <div class="search-form">
        <b-form-input
          v-model="keyword"
          class="mr-sm-2 activities-search"
          type="text"
          placeholder="검색어를 입력해주세요"
          @keyup.enter="searchresultshow(keyword)"
        ></b-form-input>
        <b-button class="my-2 my-sm-0 activities-search-btn" type="submit" @click="searchresultshow(keyword)">
          <b-icon icon="search"></b-icon>
        </b-button>
      </div>
    </div>
    <div class="mt-3 activities-kategorie">
      <b-button-group>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
      </b-button-group>
    </div>
    <div class="activities-main">
      <b-row v-for="n in 1" :key="n">
        <b-col v-for="k in member.length" :key="k" cols="12" md="3" style="margin-bottom: 20px">
          <b-card @click="$router.push('/sub/activities/activities-detail')">
            <div class="activities-main-box">
              <img :src="member[k - 1].poto" alt="" />
            </div>
            <b-card-text class="activities-main-title">{{ member[k - 1].title }}</b-card-text>
            <b-card-text class="activities-main-text">{{ member[k - 1].name }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="mt-3 activities-num">
      <b-button-group>
        <b-button class="activities-num-btn"><a href="/sub/activities">1</a></b-button>
        <b-button class="activities-num-btn"><a href="/sub/activities-2">2</a></b-button>
        <b-button class="activities-num-btn"><a href="/sub/activities-3">3</a></b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      keyword: '',
      member: [
        {
          id: '1',
          poto: 'https://cf-cpi.campuspick.com/activity/1644797843623122.jpg',
          title: '2022년 어르신-청년 세대교류활동 홍보 및 청년 참여자 모집',
          name: '창동종합사회복지관'
        },
        {
          id: '2',
          poto: 'https://cf-cpi.campuspick.com/activity/1644567270099650_thumb.jpg',
          title: 'OMG! 원어민이랑 같이 일을 한다고? and then 돈 버는 대외활동',
          name: '(주)밍글링'
        },
        {
          id: '3',
          poto: 'https://cf-cpi.campuspick.com/activity/1645866415778759.jpg',
          title: '취업준비 A to Z "지금 우리 금.융.은"',
          name: 'M.F.C'
        },
        {
          id: '4',
          poto: 'https://cf-cpi.campuspick.com/activity/1644655390287108.jpg',
          title: '[청년지원사업:서포터즈] 더높이 1기 - 스킬UP 스펙UP 취UP',
          name: 'M.F.C 청년지원사업'
        },
        {
          id: '5',
          poto: 'https://cf-cpi.campuspick.com/activity/1645510767835842.jpg',
          title: '💕새내기 멘토스쿨💕 강연 참가자 大모집🤗🤗',
          name: '청년숲'
        },
        {
          id: '6',
          poto: 'https://cf-cpi.campuspick.com/activity/1646035650345653.jpg',
          title: '2022 어썸뮤직페스티벌 서포터즈 모집',
          name: '작은사람들'
        },
        {
          id: '7',
          poto: 'https://cf-cpi.campuspick.com/activity/164602004724428.jpg',
          title: '2022 WAC 장애인식개선 서포터즈 모집',
          name: '화성시'
        },
        {
          id: '8',
          poto: 'https://cf-cpi.campuspick.com/activity/1646018287933640.jpg',
          title: '제4기 한국소비자원 콘텐츠 크리에이터 모집',
          name: '한국소비지원'
        },
        {
          id: '9',
          poto: 'https://cf-cpi.campuspick.com/activity/1646018730314974.jpg',
          title: '제2기 파주시 관광 SNS 서포터즈',
          name: '파주시'
        }
      ]
    }
  },
  methods: {
    searchresultshow(keyword) {
      if (keyword !== '') {
        //검색어를 입력한 경우
        this.$router.push({
          name: 'SearchPage',
          params: {
            keyword: this.keyword,
            isResultShow: true
          }
        })
        this.keyword = ''
        console.log('"', keyword, '"' + ' 검색')
      } else {
        alert('검색어를 입력해주세요!') //검색어를 입력하지 않은 경우
      }
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
