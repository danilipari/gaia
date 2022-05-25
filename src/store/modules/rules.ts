import { createStore } from "vuex";

const rules = createStore({
  state: {
    ruleSelected: Number(null),
    attributeSelected: Number(null),
    decisionSelected: Number(null),
  },
  mutations: {
    SET_RULE(state, index: number) {
      state.ruleSelected = index
    },
  },
  actions: {
    setRule({ commit }, index: number) {
      commit('SET_RULE', index)
    },
  },
  getters: {
    /*  */
  },
});

export default rules;