import Vue from "vue"
import Vuex from "vuex"
import { routeStore, appStore, tabStore, userStore } from "@jat-comps/store"
import customStore from "./modules/customStore"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    routeStore,
    appStore,
    tabStore,
    userStore,
    customStore
  }
})
