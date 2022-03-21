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
        <b-tab v-for="k in activities.length" :key="k" title="소개" active>
          <p>
            <span class="activities-detail-title">접수기간</span>
            <span>{{ activities[k - 1].time }}</span>
            <span class="activities-detail-title">기관</span>
            <span class="activities-detail-agency">주최</span>
            <span>화성시</span>
          </p>
          <img :src="activities[k - 1].img" alt="" class="activities-detail-img" />
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
          <b-button class="activities-detail-team-btn" @click="onClickAddNew">팀원 모집 글쓰기</b-button>
          <div>
            <b-table
              small
              hover
              striped
              :items="activityList"
              :fields="activitiesFields"
              style="margin-bottom: 70px"
              selectable
              @row-selected="onRowSelected"
            >
              <template #cell(User)="row">
                {{ row.item.User && row.item.User.nickname }}
              </template>
              <template #cell(title)="row">
                {{ row.item.title }}
              </template>
              <template #cell(createdAt)="row">
                {{ row.item.createdAt.substring(0, 10) }}
              </template>
              <template #cell(updateBtn)="row">
                <!-- 본인 컨텐츠만 수정 가능 -->
                <b-button
                  v-if="isMyContent(row.item.userId)"
                  size="sm"
                  variant="success"
                  @click="onClickEdit(row.item.id)"
                  >수정</b-button
                >
                <b-button v-else size="sm" variant="info" @click="onClickEdit(row.item.id)">보기</b-button>
              </template>
              <template #cell(deleteBtn)="row">
                <!-- 본인 컨텐츠만 삭제 가능 -->
                <b-button
                  v-if="isMyContent(row.item.userId)"
                  size="sm"
                  variant="danger"
                  @click="onClickDelete(row.item.id)"
                  >삭제</b-button
                >
              </template>
            </b-table>
          </div>
        </b-tab>
      </b-tabs>
    </div>

    <!-- inform 영역 -->
    <inform />
  </div>
</template>

<script>
import inform from '../../inform/teaminform.vue'

export default {
  components: {
    inform
  },
  data() {
    return {
      activities: [
        {
          id: '1',
          postId: '1',
          time: '2월 23일(수) ~ 3월 4일(금)',
          agency: '화성시',
          img: 'https://cf-cpi.campuspick.com/activity/164602004724428.jpg'
        }
      ],
      activitiesFields: [
        { key: 'User', label: '작성자' },
        { key: 'title', label: '제목' },
        { key: 'createdAt', label: '등록일' }
      ],
      activities_data: [
        { activities_num: 1, activities_name: '김경은', title: '모집합니다' },
        { activities_num: 2, activities_name: '김영일', title: '모집합니다' },
        { activities_num: 3, activities_name: '최송이', title: '모집합니다' },
        { activities_num: 4, activities_name: '박정혜', title: '모집합니다' }
      ],
      search: {
        postId: 1
      }
    }
  },
  computed: {
    activityList() {
      return this.$store.getters.ActivityList
    },
    insertedResult() {
      return this.$store.getters.ActivityInsertedResult
    },
    updatedResult() {
      return this.$store.getters.ActivityUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.ActivityDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리
      console.log('insertedResult', value)
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메시지 출력
          alert('등록되었습니다!')

          // 2. 리스트 재검색
          this.searchActivityList()
        } else {
          // 등록이 실패한 경우

          // 메시지 출력
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          if (value > 0) {
            // 수정이 성공한 경우

            // 1. 메시지 출력
            this.$byToast.toast('수정되었습니다.', {
              title: 'SUCCESS',
              variant: 'success',
              solid: true
            })

            // 2. 리스트 재검색
            this.searchActivityList()
          } else {
            // 수정이 실패한 경우

            // 메시지 출력
            this.$byToast.toast('수정이 실패하였습니다.', {
              title: 'ERROR',
              variant: 'danger',
              solid: true
            })
          }
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메시지 출력
          this.$$byToast.toast('삭제되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchActivityList()
  },
  methods: {
    onRowSelected() {
      this.$router.push('/sub/activities/activities-detail-2')
    },
    searchActivityList() {
      this.$store.dispatch('actActivityList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actActivityInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actActivityInit')

      // 3. 로그인 여부 체크 후 모달 출력
      if (window.localStorage.token) {
        return this.$root.$emit('bv::show::modal', 'modal-team-inform')
      } else {
        alert('로그인을 한 후 이용해주세요.')
        return false
      }
    },
    onClickEdit(id) {
      // (수정을 위한) 상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actActivityInputMode', 'update')

      // 2. 상세정보 초기화
      this.$store.dispatch('actActivityInit', id)

      // 3. 모달 출력
      this.$root.$emit('bv::show::modal', 'modal-team-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$byModal.msgBoxConfirm('삭제하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actActivityDelete', id)
        }
      })
    },
    isMyContent(userId) {
      // 해당 컨텐츠의 작성자 일치 여부
      if (userId === this.$store.getters.TokenUser.userid) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
