import { filterMenus, addRoutes } from "../../router/helpers"
import store from "@/store"
const state = {
  menus: [],
  isMenuCollapse: false,
  rootMenu: "/",
  isInitMenus: false,
  cacheRoutes: []
}
const getters = {
  menus: function (state) {
    return state.menus
  },
  isMenuCollapse: (state) => {
    return state.isMenuCollapse
  },
  rootMenu: (state) => {
    return state.rootMenu
  },
  isInitMenus: (state) => {
    return state.isInitMenus
  },
  cacheRoutes: (state) => {
    return state.cacheRoutes
  }
}
const mutations = {
  SET_MENUS: function (state, payload) {
    addRoutes(payload)
    const { menus, root } = filterMenus(payload)
    state.menus = menus
    // 设置根路由
    store.commit("routeStore/setRootMenu", root)
    // 添加固定tab选项卡
    if (root) {
      store.commit("tabStore/ADD_TABS", {
        path: root.path,
        name: root.meta.title
      })
      store.commit("tabStore/setHomeTab", {
        path: root.path,
        name: root.meta.title
      })
      store.commit("tabStore/setActiveTab", {
        path: root.path,
        name: root.meta.title
      })
    }
  },
  setMenuCollpase: function (state, payload) {
    state.isMenuCollapse = payload
  },
  setIsInitMenus: function (state, payload) {
    state.isInitMenus = payload
  },
  setRootMenu: function (state, payload) {
    state.rootMenu = payload
  },
  setCacheRoutes: function (state, payload) {
    state.cacheRoutes = payload
  },
  addCacheRoute: function (state, payload) {
    state.cacheRoutes.push(payload)
  },
  removeCacheRoute: function (state, payload) {
    state.cacheRoutes = state.cacheRoutes.filter((item) => item !== payload)
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
