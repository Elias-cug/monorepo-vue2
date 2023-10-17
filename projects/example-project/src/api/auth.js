import { request, HeadersContentType } from "@jat-comps/utils"
// import { menus } from "@/mock/menus"

export function getMenusApi(curApp) {
  return request({
    url: "/getAppMenu",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    params: {
      yydm: curApp
    }
  })
}

export function getUserInfoApi(token) {
  return request({
    url: `/getUserInfo?token=${token}`,
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.json
    }
  })
}

export function logout() {
  return request({
    url: "/logout",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    }
  })
}
