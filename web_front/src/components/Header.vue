<template>
  <div>
    <div class="header">
      <div class="container clearfix">
        <a class="item" href="/">首页</a>
        <a class="item" href="https://www.github.com/fruit5566/zhufu250.com" target="_blank" title="本站源码">GitHub</a>
        <a class="item" href="https://zhufu250.com/cms" target="_blank" title="后台管理系统">CMS</a>
        <a class="item col-xs" @click="download" title="导出为标准书签文件">导出</a>
        <input type="text" class="search col-xs" v-model="key" @keyup.enter="searchAction" placeholder="输入关键字" />
        <span class="collect" @click="collect" v-if="showCollect"> +书签</span>
      </div>
    </div>
  </div>
</template>

<script>
import { downBookmarks } from "@/api/index";
export default {
  props: {
    showCollect: {
      default: true
    }
  },
  data() {
    return {
      key: ""
    };
  },
  created() {
    let key = this.$route.query.key;
    if (key) this.key = key;
  },
  methods: {
    searchAction() {
      console.log(this.key);
      location.href = "/search?key=" + this.key;
    },
    download() {
      downBookmarks().then(blob => {
        this.saveAs(blob, "bookmark.html");
      });
    },
    collect() {
      this.$parent.visibleDialog = true;
    },
    saveAs(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement("a");
        const body = document.querySelector("body");
        link.href = window.URL.createObjectURL(blob); // 创建对象url
        link.download = filename;
        // fix Firefox
        link.style.display = "none";
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href); // 销毁 通过调用 URL.createObjectURL() 创建的 URL 对象
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 54px;
  line-height: 54px;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}

.item {
  font-size: 18px;
  margin-right: 30px;
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid;
  }
}

.search {
  width: 35%;
  height: 32px;
  font-size: 16px;
}
.container {
  position: relative;
}
.collect {
  position: absolute;
  top: 10px;
  right: 10px;
  line-height: normal;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  background-color: #00a1d6;
  border-radius: 4px;
  padding: 7px 12px;
}
</style>
