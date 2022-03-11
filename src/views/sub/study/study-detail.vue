<template>
  <div id="study-detail_wrap">
    <h3>팀원모집</h3>
    <div class="study-detail-table">
      <form action="">
        <table>
          <tr>
            <th>제목</th>
            <td>팀원모집합니다.</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>알고리즘 스터디 팀원을 모집합니다.</td>
          </tr>
        </table>
      </form>
    </div>
    <div class="study-detail-textareabox">
      <span>댓글</span>
      <b-form-textarea
        id="textarea-no-resize"
        placeholder="댓글을 입력해주세요"
        rows="3"
        no-resize
        class="study-detail-textarea"
      ></b-form-textarea>
      <button>완료</button>
    </div>
    <div class="study-detail-btn">
      <button><router-link to="/sub/study" class="color_000">이전</router-link></button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style src="@/sass/main.css"></style>
