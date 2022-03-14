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
    <div class="mt-3 activities-kategorie ketegorie">
      <b-button-group>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
        <b-button variant="outline-warning" class="activities-kategorie-btn">카테고리</b-button>
      </b-button-group>
    </div>
    <b-button class="activities-detail-team-btn" @click="onClickAddNew">게시글 등록</b-button>
    <div>
      <b-table small hover striped :items="activityList" :fields="activities_title" style="margin-bottom: 70px">
        <template #cell(User)="row">
          {{ row.item.User && row.item.User.nickname }}
        </template>
        <template #cell(Category)="row">
          {{ row.item.Category && row.item.Category.name }}
        </template>
        <template #cell(createdAt)="row">
          {{ row.item.createdAt.substring(0, 10) }}
        </template>
        <template #cell(updateBtn)="row">
          <!-- 본인 컨텐츠만 수정 가능 -->
          <b-button v-if="isMyContent(row.item.userId)" size="sm" variant="success" @click="onClickEdit(row.item.id)"
            >수정</b-button
          >
          <b-button v-else size="sm" variant="info" @click="onClickEdit(row.item.id)">보기</b-button>
        </template>
        <template #cell(deleteBtn)="row">
          <!-- 본인 컨텐츠만 삭제 가능 -->
          <b-button v-if="isMyContent(row.item.userId)" size="sm" variant="danger" @click="onClickDelete(row.item.id)"
            >삭제</b-button
          >
        </template>
      </b-table>
    </div>
    <div class="activities-main activitiesMain">
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
    <!-- inform 영역 -->
    <inform />
  </div>
</template>

<script>
import inform from './boardinform.vue'
export default {
  name: 'Nav',
  components: {
    inform
  },
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
  computed: {
    activityList() {
      return this.$store.getters.PostList
    },
    insertedResult() {
      return this.$store.getters.PostInsertedResult
    },
    updatedResult() {
      return this.$store.getters.PostUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.PostDeletedResult
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
          // this.$byToast.toast('등록되었습니다.', {
          //   title: 'SUCCESS',
          //   variant: 'success',
          //   solid: true
          // })
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
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actActivityInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actActivityInit')

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-board-inform')
    },
    onClickEdit(id) {
      // (수정을 위한) 상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actActivityInputMode', 'update')

      // 2. 상세정보 초기화
      this.$store.dispatch('actActivityInit', id)

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-board-inform')
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
      if (userId === this.$store.getters.TokenUser.id) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
