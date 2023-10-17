const state = {
  dbData: {}
}
const getters = {
  allData: function (state) {
    return state.dbData
  }
}
const mutations = {
  initDbData: (state, payload) => {
    const { table, data } = payload
    if (!state.dbData[table]) {
      // state.dbData = {
      //   ...state.dbData,
      //   [table]: data
      // }
      state.dbData[table] = data
    }
  },
  getAllDbData: (state, payload) => {
    const { table } = payload
    return {
      data: state.dbData[table] || [],
      total: (state.dbData[table] || []).length
    }
  },
  insertDbData: (state, payload) => {
    const { table, data } = payload
    state.dbData[table].unshift(data)
  },
  updateDbData: (state, payload) => {
    const { table, data } = payload
    const index = state.dbData[table].findIndex((item) => item.id === data.id)
    if (index > -1) {
      state.dbData[table].splice(index, 1, data)
    }
  },
  deleteDbData: (state, payload) => {
    const { table, id } = payload
    state.dbData[table] = state.dbData[table].filter((item) => item.id !== id)
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
