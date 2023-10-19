const state = {
  tableInfo: ""
}
const getters = {
  tableInfo: (state) => {
    return state.tableInfo
  }
}
const mutations = {
  setTableInfo: (state, payload) => {
    state.tableInfo = payload
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
