import JatInput from "./packages/input/index.js"
import JatSelect from "./packages/select/index.js"
import JatDatePicker from "./packages/datePicker/index.js"
import JatButton from "./packages/button/index.js"
import JatTable from "./packages/table/index.js"
import JatVirtalTable from "./packages/virtualTable/index.js"
import JatPagination from "./packages/pagination/index.js"
const components = [
  JatInput,
  JatSelect,
  JatDatePicker,
  JatButton,
  JatTable,
  JatVirtalTable,
  JatPagination
]
const install = function (Vue = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  JatInput,
  JatSelect,
  JatDatePicker,
  JatButton,
  JatTable,
  JatPagination,
  JatVirtalTable
}
