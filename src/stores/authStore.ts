import { createStore } from "vuex";
import * as jwt from "jose";

export const authStore = createStore({
  state() {
    return {
      token: localStorage.getItem("accessToken") as string,
      isLoggedIn: localStorage.getItem("accessToken") ? true : false,
      currentUser: localStorage.getItem("accessToken") ? jwt.decodeJwt(localStorage.getItem("accessToken") as string) : {},
    };
  },

  getters: {
    isLoggedIn (state) {
        return state.isLoggedIn;
    },

    currentUser (state) {
        return state.currentUser;
    }
  },

  mutations: {
    setToken(state, token) {
      localStorage.setItem("accessToken", token);
      state.token = token;
      state.currentUser = jwt.decodeJwt(token);
      state.isLoggedIn = true;
    },

    clearToken(state) {
      state.isLoggedIn = false;
      state.currentUser = {};
      state.token = "";
      localStorage.removeItem("accessToken");
    },
  },

  actions: {
    setToken (context, payload) {
      context.commit('setToken', payload)
    },
    clearToken (context) {
      context.commit('clearToken')
    },
  }
});
