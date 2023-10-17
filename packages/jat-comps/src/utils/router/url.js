/* eslint-disable no-undef */
import { parse } from "qs"
import router from "../../router/index"
import { clearStorage } from "../index"

export const getQuery = (search, isHash = true) => {
  if (isHash) {
    const url = location.href
    const hash = url.substring(url.indexOf("#") + 1)
    const searchIndex = hash.indexOf("?")
    const s = searchIndex !== -1 ? hash.substring(searchIndex + 1) : ""
    return parse(s)
  }
  return parse(search || window.location.search, { ignoreQueryPrefix: true })
}

export const getAppByUrl = () => {
  const projectType = process.env.VUE_APP_PROJECT_TYPE
  if (projectType === "single") {
    return process.env.VUE_APP_PROJECT_SLUG
  }
  const hash = window.location.hash
  return hash.split("/")[1]
}

export const toLogin = () => {
  clearStorage()
  const env = process.env.NODE_ENV
  if (env === "production") {
    window.location.href = loginURL + `?url=${window.location.href}`
  } else {
    router.push({ path: "/login", replace: true }).catch(() => {})
  }
}

export const getParamsFromUrl = (isHash, paramNum) => {
  let path = ""
  if (isHash) {
    const url = window.location.hash
    path = url.slice(
      url.indexOf("#") + 1,
      url.indexOf("?") === -1 ? url.length : url.indexOf("?")
    )
  } else {
    path = window.location.pathname
  }
  const pathArr = path.split("/")
  pathArr.splice(0, pathArr.length - paramNum)
  return pathArr
}
