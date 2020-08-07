<template>
  <div>
    <div class="main container">
      <div class="left">
        <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
        <LoadMoreBar @action="getMarkListByPage" :loading="loading" v-if="showLoadMore"></LoadMoreBar>
      </div>
      <div class="right col-xs">
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
import BookmarkItem from "./base/BookmarkItem";
import RecommendItem from "./base/RecommendItem";
import HotNewsItem from "./base/HotnewsItem";
import LoadMoreBar from "./base/LoadMoreBar";
import { getMarkList, getRecomendList, getHotNews } from "../api/index";

export default {
  props: ["tmpBookmark"],
  components: {
    BookmarkItem,
    RecommendItem,
    HotNewsItem,
    LoadMoreBar,
  },
  data() {
    return {
      bookmarks: [],
      recommends: [],
      hotnews: [],
      page: 1,
      loading: false,
      showLoadMore: true,
    };
  },
  created() {
    this.getMarkListByPage();

    getRecomendList().then((data) => {
      this.recommends = data;
    });

    getHotNews().then((data) => {
      this.hotnews = data;
    });
  },
  methods: {
    getMarkListByPage() {
      getMarkList(this.page).then((data) => {
        this.loading = false;
        if (data && data.length) {
          this.bookmarks = this.bookmarks.concat(data);
          this.page++;
        } else {
          this.showLoadMore = false;
        }
      });
    },
  },
  watch: {
    tmpBookmark(val) {
      this.bookmarks.unshift(val);
    },
  },
};
</script>

<style scoped>
.main {
  margin-top: 56px;
  /* margin-bottom: 56px; */
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
