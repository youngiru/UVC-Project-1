<template>
  <div id="competition-detail-wrap">
    <ul class="competition-detail-k">
      <li>카테고리</li>
      <li>카테고리</li>
      <li>카테고리</li>
    </ul>
    <div class="competition-detail-hea">
      <img src="https://cf-cpi.campuspick.com/activity/1644567716261719.jpg" alt="" />
      <p class="competition-detail-textbox">
        <span class="competition-detail-title">2022 코로나19 방역 일러스트 공모전</span>
        <span class="competition-detail-name">질병관리청</span>
      </p>
    </div>
    <div>
      <b-tabs content-class="mt-3 competition-detail-main" active-nav-item-class="text-black">
        <b-tab v-for="k in activites.length" :key="k" title="소개" active>
          <p>
            <span class="competition-detail-title">접수기간</span>
            <span>{{ activites[k - 1].time }}</span>
            <span class="competition-detail-title">기관</span>
            <span class="competition-detail-agency">주최</span>
            <span>질병관리청</span>
          </p>
          <img :src="activites[k - 1].img" alt="" class="competition-detail-img" />
          <div class="competition-detail-main-text">
            <p>
              [질병관리청] 2022 코로나19 방역 일러스트 공모전 "함께, 다시 그리는 우리들의 일상"
              <br />
              [바로가기 >>>
              <a
                href="https://www.kdca.go.kr/board.es?mid=a20504000000&bid=0014&list_no=718573&act=view"
                class="competition-detail-a"
                >https://bit.ly/3GJQF7Y</a
              >]
            </p>
            <p>
              ■ 참가자격
              <br />- 국민 누구나 참여 가능
            </p>
            <p>
              ■ 공모주제
              <br />- 생활속에서 코로나19 방역수칙을 실천하며 일상을 지키고 있는 국민들의 모습과 코로나19 극복 의지를
              표현한 일러스트 작품<br />ex) 방역수칙과 함께 하는 우리들의 일상 모음(모임, 취미, 학업, 여행 등 평범한
              일상을 배경으로 활용)
            </p>
            <p>
              ■ 공모분야
              <br />- 일러스트
            </p>
            <p>
              ■ 시상내역
              <br />- 최우수상(1명) : 300만원<br />- 우수상(2명) : 100만원<br />- 장려상(3명) : 50만원<br />-
              일상지킴이상(20명) : 2만원대 기프티콘<br />* 상금에 대한 제세공과금 본인 부담
            </p>
            <p>
              ■ 일정
              <br />- 접수기간 : 2022년 2월 9일(수) ~ 2022년 3월 9일(수) 오후 6시<br />- 심사기간 : 2022년 3월 15일(화)
              ~ 2022년 3월 18일(금)<br />- 당선발표 : 2022년 3월 23일(수)
            </p>
            <p>
              ■ 지원방법
              <br />- '질병관리청 홈페이지 > 알림●자료 > 공지사항'에서 응모양식(별첨)을 다운로드 후 작품과 함께 이메일로
              제출 <br />- 이메일 : example@email.com<br />제목명 : 응모자이름_작품명 <br />※ 작품과 응모양식을 함께
              제출하지 않을 경우 참여로 인정되지 않습니다.
            </p>
            <p>
              ■ 공모전 유의사항
              <br />○ 1인당 5개 작품 이내로 제출 가능합니다. <br />○ 응모자는 공모전 진행 방식, 지원 조건 등 모든 내용을
              확인 후 이에 동의하여 응모하는 것으로 간주합니다. <br />○ 응모작의 저작권 및 저작인접권은 응모자에게
              있습니다. <br />○ 질병관리청은 응모작을 아래와 같은 범위에서 기간에 제한 없이 활용 가능하며, 필요한 경우
              변형하여 활용될 수 있습니다. <br />- 질병관리청 공식 SNS계정, 온/오프라인 홍보물 등 프로모션 자료로 활용
              <br />- 질병관리청 공공●비영리 목적으로 홍보자료에 활용 <br />○ 시상 내역과 규모는 출품작 수 및 수준에
              따라 조정될 수 있습니다. <br />(심사기준에 부합된 작품이 없는 경우 수상작이 없을 수 있습니다.) <br />○
              아래와 같은 조건의 응모작은 심사 대상에서 제외되며, 수상했을 경우에도 수상을 취소하고 상금을 환수합니다.
              <br />(이로 인한 손해 발생 시 손해배상 책임을 질 수 있습니다.) <br />- 동일한 작품이 국내 외 타 공모전에서
              이미 수상한 경우 <br />- 일부라도 다른 작품을 표절하거나 타인의 지적재산을 침해한 것으로 인정되는 경우
              <br />- 공공질서 또는 미품양속에 저해되는 경우 <br />○ 표절, 도용 등 응모작과 관련된 분쟁이 발생될 경우
              이에 따른 민●형사상 책임은 응모자에게 귀속됩니다.
            </p>
            <p>
              ■ 문의
              <br />- 홈페이지 참고
            </p>
          </div>
        </b-tab>
        <b-tab title="팀원 모집">
          <b-button class="competition-detail-team-btn" @click="onClickAddNew">팀원 모집 글쓰기</b-button>
          <b-table
            striped
            hover
            :items="postList"
            :fields="activites_title"
            style="margin-bottom: 70px"
            selectable
            @row-selected="onRowSelected"
          >
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
        </b-tab>
      </b-tabs>
    </div>

    <inform />
  </div>
</template>

<script>
import mapGetters from 'vuex'
import inform from './inform.vue'

export default {
  components: {
    inform
  },
  data() {
    return {
      activites: [
        {
          id: '1',
          time: '2월 9일(수) ~ 3월 9일(수)',
          agency: '질병관리청',
          img: 'https://cf-cpi.campuspick.com/activity/1644567716261719.jpg'
        }
      ],
      activites_title: [
        { key: 'id', label: '번호' },
        { key: 'userId', label: '작성자' },
        { key: 'title', label: '제목' }
      ],
      activites_data: [
        { activites_num: 1, activites_name: '김경은', activites_title_data: '모집합니다' },
        { activites_num: 2, activites_name: '김영일', activites_title_data: '모집합니다' },
        { activites_num: 3, activites_name: '최송이', activites_title_data: '모집합니다' },
        { activites_num: 4, activites_name: '박정혜', activites_title_data: '모집합니다' }
      ],
      search: {
        title: null
      }
    }
  },
  computed: {
    postList() {
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
          this.searchPostList()
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
            this.searchPostList()
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
    this.searchPostList()
  },
  methods: {
    onRowSelected() {
      this.$router.push('/sub/competition/competition-detail-2')
    },
    searchPostList() {
      this.$store.dispatch('actCompetitionList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actCompetitionInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actCompetitionInit')

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-post-inform')
    },
    onClickEdit(id) {
      // (수정을 위한) 상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actCompetitionInputMode', 'update')

      // 2. 상세정보 초기화
      this.$store.dispatch('actCompetitionInit', id)

      // 3. 모달 출력
      // this.$byModal.show('modal-post-inform')
      this.$root.$emit('bv::show::modal', 'modal-post-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$byModal.msgBoxConfirm('삭제하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actPostDelete', id)
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
