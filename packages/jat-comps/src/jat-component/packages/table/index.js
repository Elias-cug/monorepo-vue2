import JatTable from "./table.vue"

/* istanbul ignore next */
JatTable.install = function (Vue) {
  Vue.component(JatTable.name, JatTable)
}

export default JatTable
