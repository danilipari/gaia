import { createStore } from "vuex";

const auth = createStore({
  state: {
    title: String("GAIA"),
    loggedIn: Boolean(false),
  },
  mutations: {
    SET_LOG(state, data: boolean) {
      state.loggedIn = data
    },
  },
  actions: {
    setLog({ commit }, data: boolean) {
      commit('SET_LOG', data)
    },
  },
  getters: {
    /*  */
  },
});

export default auth;
