<template>
  <div id="activities-detail-wrap">
    <ul class="activities-detail-k">
      <li>카테고리</li>
      <li>카테고리</li>
      <li>카테고리</li>
    </ul>
    <div class="activities-detail-hea">
      <img src="https://cf-cpi.campuspick.com/activity/164602004724428.jpg" alt="" />
      <p class="activities-detail-textbox">
        <span class="activities-detail-title">2022 WAC 장애인식개선 서포터즈 모집</span>
        <span class="activities-detail-name">화성시</span>
      </p>
    </div>
    <div>
      <b-tabs content-class="mt-3 activities-detail-main" active-nav-item-class="text-black">
        <b-tab v-for="k in activites.length" :key="k" title="소개" active>
          <p>
            <span class="activities-detail-title">접수기간</span>
            <span>{{ activites[k - 1].time }}</span>
            <span class="activities-detail-title">기관</span>
            <span class="activities-detail-agency">주최</span>
            <span>화성시</span>
          </p>
          <img :src="activites[k - 1].img" alt="" class="activities-detail-img" />
          <div class="activities-detail-main-text">
            <p>
              [화성시] 2022년 화성시 평화 서포터즈 모집
              <br />
              [바로가기 >>>
              <a href="https://blog.naver.com/hssave/222655562991" class="activities-detail-a">https://bit.ly/3vnB6Re</a
              >]
            </p>
            <p>
              ■ 모집대상
              <br />가. 화성시에 거주하거나 화성시에 관심이 있는 누구나 <br />나. 현장취재 및 기사●콘텐츠 제작이 가능한
              사람 <br />다. SNS 활용에 능통하고 글쓰기●사진촬영에 능숙한 사람
            </p>
            <p>
              ■ 활동내용
              <br />가. 화성시 서부권 생태 가치●매향리 역사 취재 및 콘텐츠 제작<br />나. 군공항이정대응 SNS 콘텐츠 공유
              및 댓글 소통, 이벤트 참여
            </p>
            <p>
              ■ 활동혜택
              <br />가. 원고료(1건 당 5만원, 본인 SNS 게재시 추가 지급) <br />나. 매월 우수 서포터즈 2인 및 연말 우수
              서포터즈 혜택 제공(상품권 등) <br />다. 평화서포터즈 위촉장, 홍보물 및 발간물 제공
            </p>
            <p>
              ■ 일정
              <br />가. 모집기간 : 2022.2.23(수) ~ 3.4(금)<br />나. 결과발표 : 2022.3.11(금) 예정
            </p>
            <p>
              ■ 지원방법
              <br />가. 제출서류 : 2022년 화성시 평화서포터즈 지원서 (개인정보 제공동의서, 저작물 사용 동의서 포함) 1부
              <br />※ 화성시청 홈페이지 고시/공고, 군공항이전대응담당관 블로그에서 다운로드<br />나. 제출방법 : 이메일
              제출(example@email.com) <br />※ 방문 접수는 받지 않음, 서명 필수<br />※ 이메일 제목 예시 : 2022년 화성시
              평화 서포터즈_홍길동(제출자 성함)
            </p>
            <p>
              ■ 문의
              <br />- 화성시청 군공항이전대응담당관 대응지원팀(☎ 031-5189-1889)
            </p>
          </div>
        </b-tab>
        <b-tab title="팀원 모집">
          <b-button class="activities-detail-team-btn">팀원 모집 글쓰기</b-button>
          <b-table
            striped
            hover
            :items="activites_data"
            :fields="activites_title"
            style="margin-bottom: 70px"
          ></b-table>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activites: [
        {
          id: '1',
          time: '2월 23일(수) ~ 3월 4일(금)',
          agency: '화성시',
          img: 'https://cf-cpi.campuspick.com/activity/164602004724428.jpg'
        }
      ],
      activites_title: [
        { key: 'activites_num', label: '번호' },
        { key: 'activites_name', label: '작성자' },
        { key: 'activites_title_data', label: '제목' }
      ],
      activites_data: [
        { activites_num: 1, activites_name: '김경은', activites_title_data: '모집합니다' },
        { activites_num: 2, activites_name: '김영일', activites_title_data: '모집합니다' },
        { activites_num: 3, activites_name: '최송이', activites_title_data: '모집합니다' },
        { activites_num: 4, activites_name: '박정혜', activites_title_data: '모집합니다' }
      ]
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
