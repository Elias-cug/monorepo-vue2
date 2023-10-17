import { default as showLoadingDirective } from "./v-loading/loading.js"
import { clickOutside } from "./v-clickoutside"

function setupDirective(vue) {
  vue.directive("clickoutside", clickOutside)
  vue.directive("showLoading", showLoadingDirective)
}

export { showLoadingDirective, clickOutside, setupDirective }
