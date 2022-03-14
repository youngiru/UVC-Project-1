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
