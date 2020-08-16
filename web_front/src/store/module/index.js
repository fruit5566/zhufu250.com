import { getBookmarks, getRecommends, getHotnews } from "@/api/index";

export default {
  namespaced: true,
  state: () => ({
    bookmarks: [],
    recommends: [],
    hotnews: [],
    loadmorebar: false
  }),
  actions: {
    fetchBookmarks: ({ commit, state }, page) => {
      return getBookmarks({ page }).then(data => {
        commit("setBookmarks", data);
        state.loadmorebar = data && data.length ? true : false;
      });
    },
    fetchRecommends: ({ commit }) => {
      return getRecommends().then(data => {
        commit("setRecommends", data);
      });
    },
    fetchHotnews: ({ commit }) => {
      return getHotnews().then(data => {
        commit("setHotnews", data);
      });
    },
    createBookmarks: ({ commit }, data) => {
      commit("pushBookmarks", data);
    }
  },
  mutations: {
    setBookmarks: (state, data) => {
      state.bookmarks = state.bookmarks.concat(data);
    },
    setRecommends: (state, data) => {
      state.recommends = data;
    },
    setHotnews: (state, data) => {
      state.hotnews = data;
    },
    pushBookmarks: (state, data) => {
      state.bookmarks.unshift(data);
    }
  }
};
