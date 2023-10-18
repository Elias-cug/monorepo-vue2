import { request, HeadersContentType } from "@jat-comps/utils"

export function getMenusApi() {
  return request({
    url: "/auth/menuList",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    }
  })
}

export function getUserInfoApi() {
  return request({
    url: `/auth/userDetail`,
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
