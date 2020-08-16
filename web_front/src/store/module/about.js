export default {
  namespaced: true,
  state: () => ({
    count: 0
  }),
  actions: {
    about: ({ commit }) => commit("about")
  },
  mutations: {
    about: state => state.count++
  }
};
