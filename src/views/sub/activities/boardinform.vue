<template>
  <div>
    <b-modal id="modal-board-inform" size="lg" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="2">
          <b-form-input id="id" v-model="post.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label-for="title">
          <b-form-input
            id="title"
            v-model="post.title"
            placeholder="제목을 입력하세요."
            :disabled="inputMode === 'update' && post.userId !== this.$store.getters.TokenUser.userid"
          ></b-form-input>
          <!-- <div id="hash_wrap">
            <label for="tag"></label>
            <b-form-tags
              v-model="post.tag"
              input-id="tag"
              placeholder="카테고리를 입력하세요."
              remove-on-delete
              tag-pills
              tag-variant="warning"
            ></b-form-tags>
          </div> -->
          <div>
            <!-- <b-form-select v-model="selected" :options="options"></b-form-select> -->
            <b-form-select v-model="selected" :options="options" class="mt-3"></b-form-select>
          </div>

          <!-- 글 등록 모드 -->
          <editor v-if="inputMode === 'insert'" ref="toastuiEditor" :options="editorOptions" />
          <div v-if="inputMode === 'update' && post.id !== null">
            <!-- 글 수정 모드(내 글은 수정 모드로) -->
            <editor
              v-if="post.userId === this.$store.getters.TokenUser.userid"
              ref="toastuiEditor"
              :options="editorOptions"
              :initial-value="post.content"
            />
            <!-- 글 보기 모드(타인의 글은 읽기 모드로) -->
            <viewer v-else :initial-value="post.content" />
          </div>
        </b-form-group>
        <b-form-group v-if="inputMode === 'update'" label="작성자" label-for="User" label-cols="2">
          <b-form-input id="UserName" :value="post.User && post.User.name" disabled></b-form-input>
        </b-form-group>
        <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="createdAt" label-cols="2">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import api from '../../../store/apiUtil'

// Toast UI Editor 모듈 추가
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'

export default {
  components: {
    editor: Editor, // 등록&수정 에디터
    viewer: Viewer // 읽기전용 뷰어
  },
  data() {
    return {
      post: {
        id: null,
        userId: null,
        categoryId: null,
        title: null,
        content: null,
        tag: null,
        images: null,
        createdAt: null,
        User: {
          id: null,
          nickname: null,
          userid: null
        },
        Category: {
          id: null,
          boardId: null,
          name: null
        }
      },
      editorOptions: {
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            // 이미지 등록 훅
            const upload = await this.uploadImage(blob)
            callback(upload, 'Alt text')
            return false
          }
        }
      },
      selected: null,
      options: [
        { value: null, text: '카테고리를 선택하세요' },
        { value: 'a', text: '국내봉사' },
        { value: 'b', text: '해외봉사/탐방' },
        { value: 'c', text: '서포터즈' },
        { value: 'd', text: '기자단' },
        { value: 'e', text: '마케터' },
        { value: 'f', text: '강연/행사' },
        { value: 'g', text: '기타' }
      ]
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Activity
    },
    inputMode() {
      return this.$store.getters.ActivityInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '게시글 등록'
      } else if (this.inputMode === 'update') {
        title = '게시글 수정'
      }

      return title
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.post = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴 때 감지됨
    this.post = { ...this.infoData }
  },
  methods: {
    scroll() {
      this.$refs.toastuiEditor.invoke('setScrollTop', 10)
    },
    moveTop() {
      this.$refs.toastuiEditor.invoke('moveCursorToStart')
    },
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        // this.post.userId = this.$store.getters.TokenUser.id // 로그인 사용자PK
        const editorContent = this.$refs.toastuiEditor.invoke('getHTML') // 에디터에 작성한 컨텐츠 담기
        this.post.content = editorContent
        console.log('onSubmit', editorContent)
        this.$store.dispatch('actActivityInsert', this.post) // 입력 실행
      }

      // 2. 수정인 경우(작성자 본인만 수정 가능)
      if (this.inputMode === 'update' && this.post.userId === this.$store.getters.TokenUser.id) {
        const editorContent = this.$refs.toastuiEditor.invoke('getHTML') //에디터에 작성한 컨텐츠 담기
        this.post.content = editorContent

        this.$store.dispatch('actActivityUpdate', this.post) // 수정 실행
      }
      if (this.inputMode === 'update') {
        const editorContent = this.$refs.toastuiEditor.invoke('getHTML') //에디터에 작성한 컨텐츠 담기
        this.post.content = editorContent

        this.$store.dispatch('actActivityUpdate', this.post) // 수정 실행
      }
    },
    uploadImage: async blob => {
      // 이미지 업로드 함수

      // multipart form-data 만들기
      const formData = new FormData()
      formData.append('image', blob)

      //RestAPI 호출
      let uploadImage = null
      try {
        const response = await api.post('/serverApi/upload/posts/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        uploadImage = response && response.data && response.data.image
      } catch (err) {
        console.log('err', err)
      }

      // 이미지URL 만들기
      const imageUrl = `/serverApi/${uploadImage}`

      return imageUrl
    }
  }
}
</script>

<style src="@/sass/main.css"></style>
