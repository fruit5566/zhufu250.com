<template>
  <div>
    <div class="main container clearfix">
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
            <HotNewsItem v-for="(item, index) of hotnews" :key="index" :item="item" />
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

    getRecomendList()
      .then((data) => {
        this.recommends = data;
      })
      .catch((err) => {
        console.log(err);
      });

    getHotNews()
      .then((data) => {
        this.hotnews = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getMarkListByPage() {
      getMarkList(this.page)
        .then((data) => {
          this.loading = false;
          if (data && data.length) {
            this.bookmarks = this.bookmarks.concat(data);
            this.page++;
          } else {
            this.showLoadMore = false;
          }
        })
        .catch((err) => {
          console.log(err);
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
  padding-top: 60px;
  padding-bottom: 60px;
  text-align: left;
  display: flex;
}
.left {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  width: 60%;
  float: left;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.right {
  width: 300px;
  padding-left: 4%;
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
