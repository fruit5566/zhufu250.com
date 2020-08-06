<template>
  <div id="app" class="search_page">
    <Header />
    <transition name="fade">
      <div class="container">
        <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
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
    };
  },
  created() {
    let key = getQueryParam("key");
    key &&
      getSearchResult(key).then((data) => {
        console.log(data);
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
.container {
  margin-top: 60px;
}
</style>
