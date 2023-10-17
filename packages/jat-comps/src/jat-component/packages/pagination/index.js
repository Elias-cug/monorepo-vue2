import JatPagination from "./pagination.vue"

/* istanbul ignore next */
JatPagination.install = function (Vue) {
  Vue.component(JatPagination.name, JatPagination)
}

export default JatPagination
