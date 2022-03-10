<template>
  <div id="competition2_wrap">
    <h3>팀원모집</h3>
    <div class="competition2-table">
      <form action="">
        <table>
          <tr>
            <th>제목</th>
            <td>팀원모집합니다.</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에
              보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘
              집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에
              보내줘 집에 보내줘 집에 보내줘 집에 보내줘 집에 보내줘
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div class="competition2-textareabox">
      <span>댓글</span>
      <b-form-textarea
        id="textarea-no-resize"
        placeholder="댓글을 입력해주세요"
        rows="3"
        no-resize
        class="competition2-textarea"
      ></b-form-textarea>
      <button>완료</button>
    </div>
    <div class="competition2-btn">
      <button><router-link to="/sub/competition-detail" class="color_000">이전</router-link></button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style src="@/sass/main.css"></style>
