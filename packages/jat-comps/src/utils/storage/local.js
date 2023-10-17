import { getAppByUrl } from "../router/url"
/**
 * @description 从localStorage 获取token
 * @returns token
 */
export function getToken() {
  return localStorage.getItem("token")
}
/**
 * @description 设置token到localStorage
 * @param {String} token
 * @returns
 */
export function setToken(token) {
  return localStorage.setItem("token", token)
}
/**
 * @description 删除token
 * @returns
 */
export function removeToken() {
  return localStorage.removeItem("token")
}

function createLocalStorage() {
  const curApp = getAppByUrl()
  function set(key, json) {
    localStorage.setItem(`${curApp}-${key}`, json)
  }
  function get(key) {
    return localStorage.getItem(`${curApp}-${key}`)
  }
  function remove(key) {
    localStorage.removeItem(`${curApp}-${key}`)
  }
  function clear() {
    window.localStorage.clear()
  }
  return {
    set,
    get,
    remove,
    clear
  }
}

export const localStg = createLocalStorage()
