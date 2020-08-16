<template>
  <div class="search_page">
    <Header :showCollect="false"></Header>
    <div class="main container" :style="{ minHeight: minHeight + 'px' }">
      <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
      <div class="nodata" v-if="!bookmarks.length">查询无数据</div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import BookmarkItem from "@/components/BookmarkItem";

import searchStoreModule from "@/store/module/search";

export default {
  asyncData({ store, route }) {
    store.registerModule("search", searchStoreModule);
    return store.dispatch("search/fetchBookmarks", route.query.key);
  },
  data() {
    return {
      minHeight: null
    };
  },
  computed: {
    bookmarks() {
      return this.$store.state.search.bookmarks;
    }
  },
  components: {
    Header,
    Footer,
    BookmarkItem
  },
  beforeMount() {
    if (window.__INITIAL_STATE__) {
      this.$store.registerModule("search", searchStoreModule, { preserveState: true });
    }
  },
  mounted() {
    this.minHeight = document.documentElement.clientHeight - 98;
  }
};
</script>

<style scoped>
.nodata {
  padding: 25px;
  font-size: 18px;
  text-align: center;
}
</style>
