<template>
  <transition name="fade">
    <div id="mask">
      <div class="modal-dialog">
        <div class="modal-header"></div>
        <div class="modal-content">
          <div class="m-row">
            <span>网址：</span>
            <input
              type="text"
              placeholder="粘贴网址或输入网址(Enter)，自动抓取标题和简介"
              v-model.trim="meta.url"
              @paste="pasteHandle"
              @keyup.enter="pasteHandle"
            />
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
import axios from "axios";
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
      setTimeout(() => {
        if (!URL_REG.test(this.meta.url)) {
          alert("网址不合法");
          return;
        }
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/bookmark/title_desc?url=${this.meta.url}`
          )
          .then(res => {
            this.meta.title = res.data.data.title;
            this.meta.desc = res.data.data.desc;
            this.disabled = false;
          })
          .catch(() => {
            this.disabled = false;
          });
      }, 0);
    },
    createBookmark() {
      if (!URL_REG.test(this.meta.url)) {
        alert("网址不合法");
        return;
      }
      axios
        .post(`${process.env.VUE_APP_API_URL}/bookmark`, this.meta)
        .then(res => {
          let tmpMeta = Object.assign(
            {
              id: res.data.data.id,
              created_at: new Date().getTime()
            },
            this.meta
          );
          this.$parent.tmpBookmark = tmpMeta;
          this.meta = {};
          this.$parent.visibleDialog = false;
          this.disabled = true;
        });
    }
  }
};
</script>

<style>
#mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  width: 600px;
  margin: 50px auto;
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
  padding: 25px 40px;
  text-align: left;
}
.m-row {
  display: flex;
  padding: 12px 10px;
}
textarea[disabled] {
  background-color: #f3f3f3;
}
input[disabled] {
  background-color: #f3f3f3;
}
.modal-content input {
  border: 1px solid #e5e5e5;
  flex: 1;
  padding: 4px 12px;
}
.modal-content textarea {
  flex: 1;
  resize: none;
  border: 1px solid #e5e5e5;
}
</style>