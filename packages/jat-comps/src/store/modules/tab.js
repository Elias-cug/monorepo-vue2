import store from "@/store"
// import { getTabIndexByPath } from "../helpers/tabHelper"
import router from "../../router"

const state = {
  openTab: [],
  openTabMaxLength: 10,
  activeTab: null,
  homeTab: false
}
const getters = {
  openTabMaxLength(state) {
    return state.openTabMaxLength
  },
  openTab(state) {
    return state.openTab
  },
  activeTab(state) {
    return state.activeTab
  },
  homeTab(state) {
    return state.homeTab
  }
}
const mutations = {
  ADD_TABS(state, route) {
    let tabs = state.openTab.map((item) => {
      return item.path
    })
    if (!tabs.includes(route.path)) {
      state.openTab.push(route)
    } else {
      state.openTab = state.openTab.map((item) => {
        if (item.path === route.path) {
          return route
        }
        return item
      })
    }
  },
  DELETE_TABS(state, route) {
    let tabs = state.openTab.map((item) => {
      return item.path
    })
    let index = tabs.indexOf(route)
    state.openTab.splice(index, 1)
  },
  clearOpenTab(state, remainHome = false) {
    if (remainHome) {
      state.openTab = state.openTab.filter((item) => {
        return item.path === state.homeTab.path
      })
    } else {
      state.openTab = []
    }
  },
  closeTab(state, payload) {
    const homePath = state.homeTab.path
    const remain = [homePath, ...payload]
    const hasActive = remain.includes(state.activeTab?.path)
    const updateTabs = state.openTab.filter((tab) => remain.includes(tab.path))
    if (hasActive) state.openTab = updateTabs
    if (!hasActive && updateTabs.length) {
      const activeTab = updateTabs[updateTabs.length - 1]
      router
        .push({ path: activeTab.path, query: activeTab.query || {} })
        .then(() => {
          state.openTab = updateTabs
          store.commit("tabStore/setActiveTab", activeTab)
        })
    }
  },
  closeOther(state, payload) {
    const excludes = [payload.path]
    store.commit("tabStore/closeTab", excludes)
  },
  updateTabName(state, payload) {
    const { path, tabName } = payload
    const index = state.openTab.findIndex((item) => {
      return item.path === path
    })
    const tab = state.openTab.findIndex((item) => {
      return item.path === path
    })
    state.openTab.splice(index, 1, {
      ...tab,
      name: tabName
    })
  },
  setActiveTab(state, payload) {
    state.activeTab = payload
  },
  setHomeTab(state, payload) {
    state.homeTab = payload
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
