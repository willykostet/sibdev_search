import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
const API_KEY = process.env.VUE_APP_API_KEY;
const url = "https://www.googleapis.com/youtube/v3";
export default new Vuex.Store({
  state: {
    logined: false,
    searchList: [],
    // searchList: [],
    select_list: [],
    inputFieldStore: null,
  },
  getters: {
    getLogined(state) {
      return state.logined;
    },
    getSearchList(state) {
      return state.searchList;
    },
    getSelectList(state) {
      return state.select_list;
    },
    getinputField(state) {
      return state.inputFieldStore;
    },
  },
  mutations: {
    SET_DATA(state, payload) {
      state.searchList = payload;
    },
    SET_INPUT(state, payload) {
      state.inputFieldStore = payload;
    },
    SET_SELECT_DATA(state) {
      let currentUser = localStorage.getItem("currentUser");
      state.select_list = JSON.parse(localStorage.getItem(currentUser));
    },
    EDIT_SELECT_DATA(state, payload) {
      const arr = state.select_list;
      arr[payload.id] = payload.data;
      state.select_list = arr;
      const currentUser = localStorage.getItem("currentUser");
      localStorage.setItem(currentUser, JSON.stringify(state.select_list));
    },
    DELETE_SELECT_DATA(state, payload) {
      const index = state.select_list.indexOf(payload);
      if (index > -1) {
        state.select_list.splice(index, 1);
      }
      const currentUser = localStorage.getItem("currentUser");
      localStorage.setItem(currentUser, JSON.stringify(state.select_list));
    },
  },
  actions: {
    async GET_DATA_API({ commit }, payload) {
      commit("SET_INPUT", payload.searchTerm);
      console.log("payload", payload);
      await axios
        .get(
          `${url}/search${
            payload.selectFilter != null ? `?order=${payload.selectFilter}` : ""
          }`,
          {
            params: {
              key: API_KEY,
              type: "video",
              part: "snippet",
              maxResults: payload.maxVal || 12,
              q: payload.searchTerm,
            },
          }
        )
        .then((response) => {
          commit("SET_DATA", response.data.items);
          this.videos = response.data.items;
        });
    },
    async GET_VIDEO_VIEW_COUNT(_,payload) {
      return await axios
        .get(`${url}/videos`, {
          params: {
            key: API_KEY,
            id: payload,
            part: "statistics",
          },
        })
        .then((response) => {
          return response.data.items[0]?.statistics;
        });
    },
  },
  modules: {},
});
