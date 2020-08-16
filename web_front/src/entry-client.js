import { createApp } from "./app";
import Vue from "vue";
import toast from "@/plugins/toast";
const { app, router, store } = createApp();

router.onReady(() => {
  app.$mount("#app");

  // 插件加载 放在客户端路由加载后执行
  Vue.use(toast);

  if (!window.__INITIAL_STATE__) {
    // fix client-only 页面 title
    document.title = app.$route.meta.title || "Set Default Title";

    // fix client-only匹配不到的路由 跳转404 开发环境（npm run serve）
    const matchedComponents = router.getMatchedComponents();
    !matchedComponents.length ? (window.location.href = "/404.html") : "";
  }
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
} else {
  // client-only 预取数据
  Vue.mixin({
    beforeMount() {
      const { asyncData } = this.$options;
      if (asyncData) {
        this.dataPromise = asyncData({
          store: this.$store,
          route: this.$route
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        })
          .then(next)
          .catch(next);
      } else {
        next();
      }
    }
  });
}
