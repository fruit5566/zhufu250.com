import Vue from "vue";
import Vuex from "vuex";
import userInfo from "./module/user";

Vue.use(Vuex);

/* 批量导入./module下的所有模块 */
// const path = require("path");
// const files = require.context("./module", false, /\.js$/);
// const modules = {};
// files.keys().forEach(key => {
//   const name = path.basename(key, ".js"); // 回key的最后一部分
//   modules[name] = files(key).default || files(key);
// });

export default function createStore() {
  return new Vuex.Store({
    modules: {
      userInfo
    }
  });
}
