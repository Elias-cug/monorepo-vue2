/* eslint-disable */
import { cloneDeep, get } from "lodash"
import router from "../index"
import { views } from "../../views"
import store from "@/store"

// 解析 path${001, 002} 此类zydm
function parseZydm(zydm) {
  const regex = /(\w+)\${(.*?)}/
  const match = zydm.match(regex)
  if (match) {
    const zydm = match[1]
    const param = match[2].split(",")
    return {
      zydm,
      param: param.join("/")
    }
  }
  return {
    zydm: zydm,
    param: null
  }
}

// 获取首页路由：取配置菜单的第一项
export function getRoot(menus, root) {
  if (!menus || !menus.length) {
    return root
  }
  return getRoot(menus[0].children, menus[0])
}

// 生成menus菜单
export function filterMenus(m) {
  const resMenus = cloneDeep(m)
  function loop(arr, isReturnHidden) {
    let fArr = []
    if (arr && arr.length) {
      fArr = arr
        .map((e) => {
          const { zydm: realZydm, param } = parseZydm(e.map.zydm)
          const routeInfo = views[realZydm]

          if (!routeInfo) {
            return undefined
          }

          let realPath = routeInfo.path
          if (param) {
            realPath = routeInfo.pathNoParam + `/${param}`
          }

          const item = {
            ...routeInfo,
            path: realPath,
            component: null,
            meta: {
              ...routeInfo.meta,
              title: e.map.zymc,
              hrefPath: routeInfo.meta.href && e.map.zydz
            }
          }

          if (!isReturnHidden) {
            const showChildren = (e.children || []).filter((m) => {
              const { zydm: realZydm } = parseZydm(m.map.zydm)
              const routeInfo = views[realZydm]
              if (!routeInfo) {
                return false
              }
              return !routeInfo.meta.hidden
            })
            if (showChildren && showChildren.length) {
              item.children = loop(showChildren)
              item.hasChildren = true
            }
          } else {
            item.children = loop(e.children)
          }
          return item
        })
        .filter((item) => item !== undefined)
    }
    return fArr
  }
  const showMenus = loop(resMenus, false)
  const menus = showMenus.filter((item) => {
    return !item.meta.hidden
  })
  const allMenus = loop(resMenus, true)

  let root = getRoot(allMenus)

  return {
    menus,
    root
  }
}

// 路由注册
export function filterForRoutes(m) {
  const arrtmp = []
  const mm = cloneDeep(m)
  // const resMenus = get(mm, "[0].children")
  const resMenus = mm
  function loop(arr) {
    if (arr && arr.length) {
      arr.forEach((e) => {
        const { zydm: realZydm, param } = parseZydm(e.map.zydm)
        const routeInfo = views[realZydm]

        if (!routeInfo) {
          console.error(
            "未匹配到配置的资源, 无法注册路由，资源代码是：",
            e.map.zydm
          )
        } else {
          let realPath = routeInfo.path
          if (param) {
            realPath = routeInfo.pathNoParam + `/${param}`
          }
          const item = {
            ...routeInfo,
            path: realPath,
            meta: {
              ...routeInfo.meta,
              title: e.map.zymc,
              hrefPath: routeInfo.meta.href && e.map.zydz
            }
          }
          arrtmp.push(item)
          if (e.children && e.children.length) {
            loop(e.children)
          }
        }
      })
    }
  }
  loop(resMenus)
  return arrtmp
}

// 路由注册
export function addRoutes(payload) {
  const routes = filterForRoutes(payload)
  routes.forEach((item) => {
    let component = null
    if (item.meta.layout === "basic") {
      component = () => import("../../Layout/BasicLayout/index.vue")
    } else if (item.meta.layout === "header") {
      component = () => import("../../Layout/HeaderLayout/index.vue")
    }
    const route = {
      path: `${item.path}-parent`,
      component: component,
      redirect: item.path,
      children: [item],
      name: `${item.name}-parent`
    }
    router.addRoute(null, route)
    store.commit("routeStore/addCacheRoute", item.name)
  })
  console.log("所有注册的路由：")
  console.log(router.getRoutes())
}
