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
  }
});

export default store;
