<template>
  <div id="join_wrap">
    <span class="join_title">회원가입</span>
    <span class="join_top_line"></span>
    <b-container fluid style="width: 900px">
      <b-row v-for="type in types" :key="type" class="my-1">
        <b-col sm="3">
          <label :for="`type-${type}`">
            <code class="join_sm_text">{{ type }}</code
            >:</label
          >
        </b-col>
        <b-col sm="9">
          <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
        </b-col>
      </b-row>
      <label for="address" class="join_address_title">지역</label>
      <input id="join_address" v-model="postcode" type="text" placeholder="우편번호" />
      <input id="join_address_btn" type="button" value="우편번호 찾기" @click="showApi()" /><br />
      <input id="address" v-model="address" type="text" placeholder="주소" /><br />
      <input id="detailAddress" type="text" placeholder="상세주소" />
    </b-container>
    <input id="join_submit" type="submit" value="회원가입" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: ['이름', '닉네임', '아이디', '비밀번호', 'email', '전화번호'],
      postcode: '',
      address: '',
      extraAddress: ''
    }
  },
  methods: {
    showApi() {
      new window.daum.Postcode({
        oncomplete: data => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let fullRoadAddr = data.roadAddress // 도로명 주소 변수
          let extraRoadAddr = '' // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')'
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          this.postcode = data.zonecode //5자리 새우편번호 사용
          this.address = fullRoadAddr
        }
      }).open()
    }
  }
}
</script>
