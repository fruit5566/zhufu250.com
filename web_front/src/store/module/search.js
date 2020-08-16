import { searchBookmarks } from "@/api/search";
export default {
  namespaced: true,
  state() {
    return {
      bookmarks: []
    };
  },
  actions: {
    fetchBookmarks: ({ commit }, key) => {
      console.log("============");
      console.log(key);
      return searchBookmarks({ key }).then(data => {
        commit("setBookmarks", data);
      });
    }
  },
  mutations: {
    setBookmarks: (state, data) => {
      state.bookmarks = data;
    }
  }
};
