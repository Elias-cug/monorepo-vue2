/* eslint-disable no-debugger */
/* eslint-disable no-undef */
import router from "@jat-comps/router"
import store from "@/store"
import { Message } from "element-ui"
import { setToken, getAppByUrl, getAppSlugs } from "@jat-comps/utils"
import { getMenusApi, getUserInfoApi } from "@/api/auth"
import { toLogin } from "@jat-comps/utils"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

function handleToken(query) {
  if (query.val) {
    setToken(query.val)
  }
}
const { appSlugs, defaultSlug } = getAppSlugs()

/**
 * 要处理的事情
 * 1. url携带token处理
 * 2. document.title 处理
 * 3. 用户信息获取
 * 4. 菜单信息获取
 * 5. 处理边界情况跳转
 *
 * 跳转到登录：
 * 1. 路由为 login
 * 2. 用户信息获取失败
 * 3. 菜单信息获取失败
 *
 * 跳转到首页：
 * 1. 已加载路由，未找到跳转路由
 *
 * 跳转到 404
 * 1. 获取菜单为空
 */
// TODO: 改为策略模式，目前 if else 太多
router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line no-debugger
  nProgress.start()
  // 处理携带token
  handleToken(to.query)

  document.title = to?.meta?.title || ""

  if (["login", "404"].includes(to.name)) {
    next()
  } else {
    if (to.meta.href) {
      window.open(to.meta.hrefPath, "_blank")
      router.push({ path: from.path })
      nProgress.done()
    }

    const token = localStorage.getItem("token")
    const isLogin = Boolean(token)

    let curApp = getAppByUrl()
    if (![...appSlugs].includes(curApp)) {
      curApp = defaultSlug
    }
    store.commit("appStore/SET_APP_ID", curApp)
    const isInitMenus =
      store.state.routeStore.menus.length &&
      store.state.appStore.appId === curApp

    if (!isInitMenus) {
      if (isLogin) {
        const { data } = await getUserInfoApi(token)
        if (data) {
          store.commit("userStore/setUserInfo", data?.data)
          const { data: routeData } = await getMenusApi(curApp)
          if (routeData) {
            let result = JSON.parse(routeData?.data)
            let menus = JSON.parse(result.menu)
            if (menus.length) {
              store.commit("routeStore/SET_MENUS", menus)
              store.commit("appStore/SET_APP_INFO", appInfo[curApp])
              store.commit("routeStore/setIsInitMenus", true)
              if (to.name === "NotFound") {
                const path =
                  to.path === "/"
                    ? store.state.routeStore.rootMenu.path
                    : to.fullPath
                router.push({ path, replace: true, query: to.query })
              } else {
                next()
              }
            } else {
              Message({
                message: "当前用户无可用菜单，请联系管理员授权",
                type: "error",
                duration: 2000
              })
              router.push({ path: "/404" })
              nProgress.done()
            }
          } else {
            toLogin()
          }
        } else {
          toLogin()
          nProgress.done()
        }
      } else {
        if (to.name === "login") {
          next()
        } else {
          toLogin()
          nProgress.done()
        }
      }
    } else {
      if (to.name === "NotFound") {
        const path = store.state.routeStore.rootMenu.path
        router.push({ path, replace: true, query: to.query })
        nProgress.done()
      } else {
        next()
      }
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})
