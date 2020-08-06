<template>
  <div id="app">
    <Header />
    <IndexMain :tmpBookmark="tmpBookmark" />
    <Footer />
    <transition name="fade">
      <IndexMask v-if="visibleDialog" />
    </transition>
    <ScrollTop></ScrollTop>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import IndexMain from "@/components/IndexMain";
import IndexMask from "@/components/plugin/IndexMask";
import ScrollTop from "@/components/plugin/ScrollTop";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    IndexMain,
    IndexMask,
    ScrollTop,
  },
  data() {
    return {
      visibleDialog: false,
      tmpBookmark: {},
    };
  },
};
</script>

