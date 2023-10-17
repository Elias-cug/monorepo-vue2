const state = {
  userInfo: null
}
const getters = {
  userInfo: function (state) {
    return state.userInfo
  },
  userName: function (state) {
    return state?.userInfo?.ryxm || ""
  }
}
const mutations = {
  setUserInfo: (state, payload) => {
    const userInfo = JSON.parse(payload || JSON.stringify(null))
    state.userInfo = userInfo
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
