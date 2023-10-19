import Vue from "vue"
import Vuex from "vuex"
import { routeStore, appStore, tabStore, userStore } from "@jat-comps/store"
import compareInfo from "./modules/compareInfo"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    routeStore,
    appStore,
    tabStore,
    userStore,
    compareInfo
  }
})
