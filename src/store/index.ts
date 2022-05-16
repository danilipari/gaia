import { Operators } from "@/assets/interfaces";
import { createStore } from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";

const store = createStore({
  modules: {
    auth: auth,
    user: user
  },
  state: {
    title: "Gaia",
    profilePic: "https://avatars.githubusercontent.com/u/64545085",
    operator: [
      Operators.equal,
      Operators.notEqual,
      Operators.in,
      Operators.notIn,
      Operators.contains,
      Operators.doesNotContain,
      Operators.lessThan,
      Operators.lessThanInclusive,
      Operators.greaterThan,
      Operators.greaterThanInclusive
    ]
  }
});

export default store;
