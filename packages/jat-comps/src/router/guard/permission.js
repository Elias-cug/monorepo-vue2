/* eslint-disable no-undef */
import router from "@jat-comps/router"
import store from "@/store"
import { setToken, getAppByUrl } from "@jat-comps/utils"
import { getMenusApi, getUserInfoApi } from "@/api/auth"
import { toLogin } from "@jat-comps/utils"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

// let canRun = true
function handleToken(query) {
  if (query.val) {
    setToken(query.val)
  }
}

/**
 * 1. 去登录页，就去吧
 * 2. 没 token，去登录或sso吧
 * 3. 有 token 没有用户信息，获取用户信息
 * 4. 没有当前 app 的菜单，获取当前app菜单
 * 5. 如果是 href，另起标签，打开页面
 * 6. 如果没找到，定位到首页
 */

router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line no-debugger
  // debugger
  nProgress.start()

  document.title = to?.meta?.title || ""
  if (to.name === "login") {
    next()
    return
  }

  // 处理携带token
  handleToken(to.query)

  const token = localStorage.getItem("token")
  const userInfo = store.state.userStore.userInfo

  if (!token) {
    toLogin()
  }

  if (token && !userInfo) {
    const { data } = await getUserInfoApi(token)
    if (data) {
      store.commit("userStore/setUserInfo", data?.data)
    }
  }

  let curApp = getAppByUrl()
  if (!["jat-fxrw", "jat-sjfx", "jat-qzhxzhfx"].includes(curApp)) {
    curApp = "jat-fxrw"
  }
  if (
    !store.state.routeStore.menus.length ||
    store.state.appStore.appId !== curApp
  ) {
    store.commit("tabStore/clearOpenTab")
    store.commit("appStore/SET_APP_ID", curApp)
    const { data } = await getMenusApi(curApp)
    if (data) {
      let result = JSON.parse(data?.data)
      let menus = JSON.parse(result.menu)
      store.commit("routeStore/SET_MENUS", menus)
      store.commit("appStore/SET_APP_ID", curApp)
      store.commit("appStore/SET_APP_INFO", appInfo[curApp])
    }
  }

  if (to.meta.href) {
    window.open(to.meta.href, "_blank")
    next({ path: from.path })
    nProgress.done()
  }

  if (to.name === "NotFound") {
    const path =
      to.fullPath === "/" ? store.state.routeStore.rootMenu.path : to.fullPath
    next({
      path,
      query: { ...to.query },
      params: { ...to.params }
    })
    return
  }

  next()
})

router.afterEach(() => {
  nProgress.done()
})
