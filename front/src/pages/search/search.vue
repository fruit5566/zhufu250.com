<template>
  <div id="app" class="search_page clearfix">
    <Header />
    <transition name="fade">
      <div class="container clearfix">
        <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
        <div>{{message}}</div>
      </div>
    </transition>
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import BookmarkItem from "@/components/base/BookmarkItem";
import { getSearchResult } from "@/api/search";
import { getQueryParam } from "@/utils/urlParse";
export default {
  components: {
    Header,
    Footer,
    BookmarkItem,
  },
  data() {
    return {
      bookmarks: [],
      message: "",
    };
  },
  created() {
    let key = getQueryParam("key");
    key &&
      getSearchResult(key).then((data) => {
        this.bookmarks = data;
        if (!data || !data.length) this.message = "无数据";
      }).catch(err => {
        console.log(err);
      });
  },
};
</script>

<style>
.search_page .collect {
  display: none;
}
</style>

<style scoped>
.search_page {
  padding: 60px 0;
}
</style>
