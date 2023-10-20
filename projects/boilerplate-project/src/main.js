import Vue from "vue"
import App from "./App.vue"
import router from "@jat-comps/router"
import store from "./store"
require("intersection-observer")
import ResizeObserver from "resize-observer-polyfill"
import { setupAssets } from "@jat/comps"
import JATUI from "@jat-comps/jat-component/index"
// import "./router/guard"
import "@jat-comps/router/guard"
import { setupSvgIcon } from "@jat-comps/components/JatIcon"
import { setupSvgIconProject } from "./assets/svg"
import { setupViews } from "./views/setup-views"
import VueVirtualScroller from "vue-virtual-scroller"
import "vue-virtual-scroller/dist/vue-virtual-scroller.css"
import { setupDirective } from "@jat-comps/directive"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@jat-comps/assets/css/jat-base.less"
import "@jat-comps/styles/index.less"
import Contextmenu from "vue-contextmenujs"
import Header from "@/Layout/Header.vue"

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver
}

import VXETable from "vxe-table"
import "vxe-table/lib/style.css"
// ----------------------------封装ui---------------------------
// import JATUI from "./jat-component/index"
// ----------------------------封装ui---------------------------
// import "./permission" // 权限相关
import "./assets/css/jatBase.less"
try {
  // eslint-disable-next-line no-undef
  document.documentElement.setAttribute("theme-color", themeColor)
} catch (e) {
  console.warn("请配置主题色")
}

setupSvgIcon()
setupSvgIconProject()
setupViews()
setupDirective(Vue)
store.commit("appStore/setCustomHeader", Header)

Vue.use(VueVirtualScroller)
Vue.use(ElementUI)
Vue.use(JATUI)
Vue.use(setupAssets)
Vue.use(Contextmenu)
Vue.use(VXETable)
Vue.config.productionTip = false
// Vue.config.performance = true
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
