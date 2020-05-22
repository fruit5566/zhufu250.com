<template>
<div>
  <div class="header clearfix">
    <div class="container nav clearfix">
      <a class="item" href="/">首页</a>
      <a
        class="item"
        href="https://www.github.com/fruit5566/zhufu250.com"
        target="_blank"
        title="本站源码"
      >GitHub</a>
      <a class="item" href="https://zhufu250.com/cms" target="_blank" title="后台管理系统">CMS</a>
      <a class="item" @click="download" title="导出为标准书签文件">导出</a>
      <input type="text" class="search" placeholder="功能开发中..." />
      <span class="collect" @click="collect">收录网站</span>
    </div>
  </div>
</div>
</template>

<script>

export default {
  methods: {
    download() {
      this.getBlob(`${process.env.VUE_APP_API_URL}/download`).then(blob => {
        this.saveAs(blob, "bookmark.html");
      });
    },
    collect() {
      this.$parent.visibleDialog = true
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
    },
    getBlob(url) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };
        xhr.send();
      });
    }
  }
};
</script>

<style>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 56px;
  line-height: 56px;
  z-index: 2;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}
.nav {
  text-align: left;
  position: relative;
}
.nav .item {
  font-size: 18px;
  color: #009a61;
  font-weight: 700;
  margin-right: 35px;
  cursor: pointer;
}
.item:hover {
  text-decoration: none;
  border-bottom: 2px solid;
}
.nav .search {
  width: 35%;
  height: 34px;
  padding: 1px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
.nav .collect {
  position: absolute;
  top: 10px;
  right: 0;
  line-height: initial;
  font-size: 16px;
  font-weight: normal;
  color: #ffffff;
  background-color: #009a61;
  border-radius: 4px;
  padding: 7px 12px;
}
.nav .collect:hover {
  background-color: #006741;
  border-color: #00432a;
  cursor: pointer;
}
</style>