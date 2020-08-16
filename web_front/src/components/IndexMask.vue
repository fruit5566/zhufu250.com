<template>
  <transition name="fade">
    <div id="mask">
      <div class="modal-dialog">
        <div class="modal-header"></div>
        <div class="modal-content">
          <div class="m-row">
            <span>网址：</span>
            <input type="text" placeholder="粘贴网址或输入网址(Enter)，自动抓取标题和简介" v-model.trim="meta.url" @paste="pasteHandle" @keyup.enter="pasteHandle" />
          </div>
          <div class="m-row">
            <span>标题：</span>
            <input type="text" v-model.trim="meta.title" :disabled="disabled" />
          </div>
          <div class="m-row">
            <span>简介：</span>
            <textarea name v-model.trim="meta.desc" rows="5" :disabled="disabled"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-cancel" @click="cancelHander">取消</div>
          <div class="modal-confirm" @click="confirmHander">确认</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getTitleAndDescByUrl, createBookMark } from "@/api/index";
const URL_REG = /(^https?:\/\/)((\w+\.)+([a-z]{2,6})+|(([0-9]{1,3}\.){3}[0-9]{1,3}))/;
export default {
  data() {
    return {
      visibleDialog: false,
      meta: {
        url: "",
        title: "",
        desc: ""
      },
      disabled: true
    };
  },
  methods: {
    cancelHander() {
      this.$parent.visibleDialog = false;
    },
    confirmHander() {
      this.createBookmark();
    },
    pasteHandle() {
      if (!this.meta.url.startsWith("http")) {
        this.meta.url = "http://" + this.meta.url;
      }

      //  fix: paste event无法立刻获取数据 (nextTick无效)
      setTimeout(() => {
        let url = encodeURI(this.meta.url);
        if (!URL_REG.test(this.meta.url)) {
          this.$toast("网址不合法");
          this.meta = {};
          return;
        }
        getTitleAndDescByUrl({ url })
          .then(res => {
            console.log(res);
            this.meta.title = res.data.title;
            this.meta.desc = res.data.desc;
            this.disabled = false;
          })
          .catch(() => {
            this.disabled = false;
          });
      }, 0);
    },
    createBookmark() {
      if (!URL_REG.test(this.meta.url)) {
        this.$toast("网址不合法");
        return;
      }
      createBookMark(this.meta).then(data => {
        let tmpMeta = Object.assign(
          {
            id: data.id,
            created_at: new Date().getTime()
          },
          this.meta
        );
        // this.$parent.tmpBookmark = tmpMeta
        this.$store.dispatch("index/createBookmarks", tmpMeta);
        this.meta = {};
        this.$parent.visibleDialog = false;
        this.disabled = true;
      });
    }
  }
};
</script>

<style scoped>
#mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 15px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  position: relative;
  top: 15%;
  left: 50%;
  width: 100%;
  max-width: 600px;
  font-size: 16px;
  transform: translate(-50%);
  background-color: #ffffff;
  border-radius: 7px;
  overflow: hidden;
}
.modal-header {
  height: 44px;
  background-color: #f3f3f3;
}
.modal-footer {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.modal-cancel,
.modal-confirm {
  display: inline-block;
  width: 200px;
  text-align: center;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 6px;
  color: #000000;
  background-color: #e6e6e6;
  margin-left: 35px;
}
.modal-cancel:hover {
  background-color: #ccc;
}
.modal-dialog .modal-confirm {
  color: #ffffff;
  background-color: #009a61;
}
.modal-confirm:hover {
  background-color: #006741;
  border-color: #00432a;
}
.modal-content {
  padding: 0 26px;
  text-align: left;
}
.m-row {
  display: flex;
  margin-top: 20px;
}
textarea[disabled] {
  background-color: #f3f3f3;
}
input[disabled] {
  background-color: #f3f3f3;
}
.modal-content input {
  flex: 1;
  padding: 4px 12px;
}
.modal-content textarea {
  padding: 6px;
  flex: 1;
  resize: none;
  border: 1px solid #e5e5e5;
}
</style>
