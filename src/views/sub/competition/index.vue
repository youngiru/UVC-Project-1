<template>
  <div id="competition_wrap">
    <h3>공모전</h3>
    <div class="menu-nav">
      <div class="search-form">
        <b-form-input
          v-model="keyword"
          class="mr-sm-2 competition-search"
          type="text"
          placeholder="검색어를 입력해주세요"
          @keyup.enter="searchresultshow(keyword)"
        ></b-form-input>
        <b-button class="my-2 my-sm-0 competition-search-btn" type="submit" @click="searchresultshow(keyword)">
          <b-icon icon="search"></b-icon>
        </b-button>
      </div>
    </div>
    <div class="mt-3 competition-kategorie">
      <b-button-group>
        <b-button variant="outline-warning" class="competition-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="competition-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="competition-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="competition-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="competition-kategorie-btn">카테고리</b-button>
      </b-button-group>
    </div>
    <div class="competition-main">
      <b-row v-for="n in 1" :key="n">
        <b-col v-for="k in member.length" :key="k" cols="12" md="3" style="margin-bottom: 20px">
          <b-card @click="$router.push('/sub/competition/competition-detail')">
            <div class="competition-main-box">
              <img :src="member[k - 1].poto" alt="" />
            </div>
            <b-card-text class="competition-main-title">{{ member[k - 1].title }}</b-card-text>
            <b-card-text class="competition-main-text">{{ member[k - 1].name }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="mt-3 competition-num">
      <b-button-group>
        <b-button class="competition-num-btn"><a href="/sub/competition">1</a></b-button>
        <b-button class="competition-num-btn"><a href="/sub/competition-2">2</a></b-button>
        <b-button class="competition-num-btn"><a href="/sub/competition-3">3</a></b-button>
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
          poto: 'https://cf-cpi.campuspick.com/activity/1641778296564146_thumb.jpg',
          title: '제 4회 밀크T 창작동화 공모전',
          name: '천재교육, 천재교과서, 해법에듀'
        },
        {
          id: '2',
          poto: 'https://cf-cpi.campuspick.com/activity/164568357191481_thumb.jpg',
          title: '제 2회 서울 Book&Contents Fair 작품공모',
          name: '(사)서울북앤콘텐츠페어 조직위원회'
        },
        {
          id: '3',
          poto: 'https://cf-cpi.campuspick.com/activity/1642746500934774_thumb.jpg',
          title: '2022 생명문화 출판 콘텐츠 공모전',
          name: '환경과생명문화재단 이다'
        },
        {
          id: '4',
          poto: 'https://cf-cpi.campuspick.com/activity/1642659421327487_thumb.jpg',
          title: '2022 대한민국 대학생 패키징 공모전',
          name: '산업통상자원부'
        },
        {
          id: '5',
          poto: 'https://cf-cpi.campuspick.com/activity/1646022029371263_thumb.jpg',
          title: '제 8회 소통고리 대학생 자원봉사 공모대전',
          name: '부산광역시자원봉사센터, 한국수력원자력 고리원자력본부'
        },
        {
          id: '6',
          poto: 'https://cf-cpi.campuspick.com/activity/1646014549512332_thumb.jpg',
          title: '2022년 암예방●암검진 슬로건 공모전',
          name: '충남대학교병원 대전지역암센터'
        },
        {
          id: '7',
          poto: 'https://cf-cpi.campuspick.com/activity/1646015088720636_thumb.jpg',
          title: '2022 ALT 대학생 청년 작가 전시 공모',
          name: 'ALT'
        },
        {
          id: '8',
          poto: 'https://cf-cpi.campuspick.com/activity/1645540316871271_thumb.jpg',
          title: '2022년 공주시 상권 활성화 및 창업 아이디어 해커톤 참여자 모집',
          name: '공주시'
        },
        {
          id: '9',
          poto: 'https://cf-cpi.campuspick.com/activity/1645577064734457_thumb.jpg',
          title: '2022 대전홍보관 대전 홍보사진●영상 공모전',
          name: '(주)알비노'
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
