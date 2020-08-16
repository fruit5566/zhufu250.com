export default {
  namespaced: true,
  state: () => ({
    userInfo: {
      name: "zhufu250",
      login: true
    }
  }),
  actions: {
    // about: ({ commit }) => commit("about")
    test: () => {
      console.log("---test---");
    }
  },
  mutations: {
    // about: state => state.count++
  }
};
