const state = {
  tableInfo: "",
  searchSql: "",
  modelInfo: ""
}
const getters = {
  tableInfo: (state) => {
    return state.tableInfo
  },
  searchSql: () => {
    return state.searchSql
  },
  modelInfo: () => {
    return state.modelInfo
  }
}
const mutations = {
  setTableInfo: (state, payload) => {
    state.tableInfo = payload
  },
  setSearchSql: (state, payload) => {
    state.searchSql = payload
  },
  setModelInfo: (state, payload) => {
    state.modelInfo = payload
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
