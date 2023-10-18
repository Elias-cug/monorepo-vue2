/* eslint-disable no-debugger */
/* eslint-disable no-undef */
import router from "@jat-comps/router"
import store from "@/store"
import { setToken, getAppByUrl } from "@jat-comps/utils"
import { getMenusApi, getUserInfoApi } from "@/api/auth"
import { toLogin } from "@jat-comps/utils"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

function handleToken(query) {
  if (query.val) {
    setToken(query.val)
  }
}

router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line no-debugger

  nProgress.start()
  // 处理携带token
  handleToken(to.query)

  document.title = to?.meta?.title || ""

  if (to.meta.href) {
    window.open(to.meta.hrefPath, "_blank")
    next({ path: from.path })
    nProgress.done()
  }

  const token = localStorage.getItem("token")
  const isLogin = token

  let curApp = getAppByUrl()
  if (!["jat-sjpzbd"].includes(curApp)) {
    curApp = "jat-sjpzbd"
  }
  const isInitMenus =
    store.state.routeStore.menus.length && store.state.appStore.appId === curApp

  if (!isInitMenus) {
    if (isLogin) {
      const { data } = await getUserInfoApi(token)
      if (data) {
        store.commit("userStore/setUserInfo", data?.data)
      }
      store.commit("appStore/SET_APP_ID", curApp)
      const { data: routeData } = await getMenusApi(curApp)
      if (routeData) {
        let result = JSON.parse(routeData?.data)
        let menus = JSON.parse(result.menu)
        store.commit("routeStore/SET_MENUS", menus)
        store.commit("appStore/SET_APP_ID", curApp)
        store.commit("appStore/SET_APP_INFO", appInfo[curApp])
        store.commit("routeStore/setIsInitMenus", true)
      }
      if (to.name === "NotFound") {
        const path =
          to.path === "/" ? store.state.routeStore.rootMenu.path : to.fullPath
        next({ path, replace: true, query: to.query })
      } else {
        next()
      }
    } else {
      if (to.name === "login") {
        next()
      } else {
        toLogin()
      }
    }
  } else {
    if (to.name === "NotFound") {
      const path = store.state.routeStore.rootMenu.path
      next({ path, replace: true, query: to.query })
      nProgress.done()
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})
