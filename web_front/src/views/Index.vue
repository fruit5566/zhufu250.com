<template>
  <div id="index_page">
    <Header />
    <div class="main container">
      <div class="left">
        <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
        <Loadmore @reachBottom="getBookmarksByPage" :loading="loading" v-if="loadmorebar"></Loadmore>
      </div>
      <div class="right col-xs">
        <div class>
          <div class="title">推荐工具</div>
          <RecommendItem class="recommend" v-for="item of recommends" :key="item.id" :item="item" />
        </div>
        <div class>
          <div class="title">百度热搜</div>
          <transition-group name="fade">
            <HotnewsItem2 v-for="item of hotnews" :key="item.id" :item="item" />
          </transition-group>
        </div>
      </div>
    </div>
    <Footer />
    <ScrollTop></ScrollTop>
    <transition name="fade">
      <IndexMask v-if="visibleDialog" />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import BookmarkItem from "@/components/BookmarkItem";
import ScrollTop from "@/components/ScrollTop";
import RecommendItem from "@/components/RecommendItem";
import HotnewsItem2 from "@/components/HotnewsItem2";
import Loadmore from "@/components/Loadmore";
import IndexMask from "@/components/IndexMask";

import indexStoreModule from "@/store/module/index";

export default {
  components: {
    Header,
    Footer,
    BookmarkItem,
    RecommendItem,
    HotnewsItem2,
    Loadmore,
    ScrollTop,
    IndexMask
  },
  asyncData({ store }) {
    store.registerModule("index", indexStoreModule);
    return Promise.all([store.dispatch("index/fetchBookmarks", 1), store.dispatch("index/fetchRecommends")]);
  },
  data() {
    return {
      page: 2,
      visibleDialog: false,
      loading: false
    };
  },
  computed: {
    bookmarks() {
      return this.$store.state.index.bookmarks;
    },
    recommends() {
      return this.$store.state.index.recommends;
    },
    hotnews() {
      return this.$store.state.index.hotnews;
    },
    loadmorebar() {
      return this.$store.state.index.loadmorebar;
    }
  },
  beforeMount() {
    if (window.__INITIAL_STATE__) {
      this.$store.registerModule("index", indexStoreModule, {
        preserveState: true
      });
    }
    this.$store.dispatch("index/fetchHotnews");
  },
  methods: {
    getBookmarksByPage() {
      this.$store.dispatch("index/fetchBookmarks", this.page).then(() => {
        this.page++;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  min-height: 1000px;
}
.left {
  flex: 1;
}
.right {
  width: 310px;
  padding-left: 25px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  .title {
    font-size: 18px;
    margin-top: 15px;
  }
}
</style>
