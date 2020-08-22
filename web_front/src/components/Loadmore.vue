<template>
  <div class="loadmore">{{ msg }}</div>
</template>

<script>
export default {
  props: ["loading"],
  data() {
    return {
      msg: "loading ..."
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  methods: {
    scrollHandle() {
      // 获取滚动条当前的位置
      function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      }
      // 获取当前可视范围的高度
      function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
      }
      // 获取文档完整的高度
      function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }

      // reachBottom
      if (parseInt(getScrollTop() + getClientHeight()) + 100 > getScrollHeight() && !this.loading) {
        this.$parent.loading = true;
        this.$emit("reachBottom");
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandle);
  }
};
</script>

<style scoped>
.loadmore {
  text-align: center;
}
</style>
