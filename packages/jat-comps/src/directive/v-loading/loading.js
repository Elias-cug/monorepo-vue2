import Vue from "vue"
import LoadingComponent from "./LoadingComp.vue"
import { getStyle } from "element-ui/src/utils/dom"

const showLoadingDirective = {
  inserted(el, binding) {
    const loadingCtor = Vue.extend(LoadingComponent)
    const loadingCom = new loadingCtor()
    const htmlLoading = loadingCom.$mount().$el
    el.myHtml = htmlLoading
    el.originalPosition = getStyle(el, "position")
    if (binding.value) {
      appendHtml(el)
    }
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? appendHtml(el) : removeHtml(el)
    }
  }
}
function appendHtml(el) {
  if (
    el.originalPosition !== "absolute" &&
    el.originalPosition !== "fixed" &&
    el.originalPosition !== "sticky"
  ) {
    el.classList.add("el-loading-parent--relative")
  }
  el.appendChild(el.myHtml)
}
function removeHtml(el) {
  el.classList.remove("el-loading-parent--relative")
  el.removeChild(el.myHtml)
}
export default showLoadingDirective
