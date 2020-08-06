<template>
  <div id="app" class="search_page">
    <Header />
    <transition name="fade">
      <div class="container">
        <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
        <div>{{message}}</div>
      </div>
    </transition>
    <Footer />
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
      });
  },
};
</script>

<style>
.search_page .collect {
  display: none;
}
html {
  height: 100%;
}
body {
  height: 100%;
}
</style>

<style scoped>
.search_page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container {
  padding-top: 60px;
  flex: 1;
}
</style>
