const state = {
  appId: "",
  appInfo: {},
  customHeader: null
}
const getters = {
  appName: (state) => {
    return state.appInfo.name
  },
  appInfo: (state) => {
    return state.appInfo
  },
  appId: (state) => {
    return state.appId
  },
  isMenuCollapse: (state) => {
    return state.isMenuCollapse
  },
  customHeader: (state) => {
    return state.customHeader
  }
}
const mutations = {
  SET_APP_NAME: function (state, name) {
    state.appName = name
  },
  SET_APP_ID: function (state, payload) {
    state.appId = payload
  },
  SET_APP_INFO: function (state, payload) {
    state.appInfo = payload
  },
  setMenuCollpase: function (state, payload) {
    state.isMenuCollapse = payload
  },
  setCustomHeader: function (state, payload) {
    state.customHeader = payload
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
