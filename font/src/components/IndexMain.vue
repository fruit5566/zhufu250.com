<template>
<div>
  <div class="main container">
    <div class="left">
      <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
    </div>
    <div class="right">
      <div class="recommend sec">
        <div class="title">推荐工具</div>
        <RecommendItem v-for="item of recommends" :key="item.id" :item="item" />
      </div>
      <div class="hownews sec">
        <div class="title">百度热搜</div>
        <div class>
          <HotNewsItem v-for="item of hotnews" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </div>
</div>

 
</template>

<script>
import axios from "axios";
import BookmarkItem from "./base/BookmarkItem";
import RecommendItem from "./base/RecommendItem";
import HotNewsItem from "./base/HotnewsItem";

export default {
  props:["tmpBookmark"],
  components: {
    BookmarkItem,
    RecommendItem,
    HotNewsItem,
  },
  data() {
    return {
      bookmarks: [],
      recommends: [],
      hotnews: [],
    };
  },
  created() {
    axios.get(`${process.env.VUE_APP_API_URL}/bookmarks`).then(res => {
      this.bookmarks = res.data.data;
    });
    axios.get(`${process.env.VUE_APP_API_URL}/recommends`).then(res => {
      this.recommends = res.data.data;
    });
    axios.get(`${process.env.VUE_APP_API_URL}/hotnews`).then(res => {
      this.hotnews = res.data.data;
    });
  },
  watch: {
    tmpBookmark(val) {
      this.bookmarks.unshift(val)
      console.log(val)
    }
  }
};
</script>

<style scoped>
.main {
  margin-top: 56px;
  display: flex;
  text-align: left;
}
.left {
  flex: 1;
}
.right {
  width: 280px;
  margin-left: 4%;
  color: #555;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
}
.sec {
  padding: 15px 0;
}
.sec .title {
  font-weight: 700;
  font-size: 16px;
  line-height: 28px;
  color: #555;
}
</style>