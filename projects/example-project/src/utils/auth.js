/**
 * @description 从sessionstorage 获取token
 * @returns token
 */
export function getToken() {
  return sessionStorage.getItem("token")
}
/**
 * @description 设置token到sessionstorage
 * @param {String} token
 * @returns
 */
export function setToken(token) {
  return sessionStorage.setItem("token", token)
}
/**
 * @description 删除token
 * @returns
 */
export function removeToken() {
  return sessionStorage.removeItem("token")
}
