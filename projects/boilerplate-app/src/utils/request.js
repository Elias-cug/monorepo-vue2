/* eslint-disable no-undef */
import axios from "axios"
import { resetRouter } from "../router"
import { getToken } from "@/utils/auth"
import { Message } from "element-ui"
import store from "@/store"
import NProgress from "nprogress" // progress bar

// 登录失效messsage标识--确保只弹出一次
let isExipreTokenMessage = true

const service = axios.create({
  baseURL: "",
  timeout: 10000 // 接口超时时间
})
/**
 * @description 接口请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    config.url = baseUrl + config.url
    if (!config.headers.Authorization) {
      // 设置接口token
      config.headers["Authorization"] = getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (
      response.headers["content-disposition"] &&
      response.data.type === "application/x-msdownload"
    ) {
      return {
        data: response.data,
        name: response.headers["content-disposition"]
      }
    }
    if (response.data.type === "application/x-msdownload") {
      // 下载接口等，直接将后端返回流返回
      return response.data
    }
    if (response.data instanceof Blob) {
      return response.data
    }
    const res = response.data
    if (res.code == "600") {
      // 登录失效处理
      handleExipre()
      return Promise.reject("退出登录")
    } else if (res.code != "200") {
      // 其他异常
      Message({
        message: res.msg || "Error",
        type: "error",
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || "Error"))
    } else {
      return res
    }
  },
  (error) => {
    // 接口异常
    Message({
      message: error.msg,
      type: "error",
      duration: 5 * 1000
    })
    NProgress.done()
    return Promise.reject(error)
  }
)
export default service
/**
 * @description 请求头Content-Type
 */
export const HeadersContentType = {
  urlencoded: "application/x-www-form-urlencoded;charset=utf-8",
  json: "application/json;charset=utf-8",
  multipart: "multipart/form-data"
}
/**
 * @description 登录失效处理函数
 */
function handleExipre() {
  if (isExipreTokenMessage) {
    // 是否已经存在 "请重新登录" 消息
    isExipreTokenMessage = false
    Message({
      message: "请重新登录!",
      type: "error",
      duration: 5 * 1000,
      onClose: () => {
        isExipreTokenMessage = true
      }
    })
  }
  resetRouter() // 重置路由
  sessionStorage.clear() // 清空sessionStorage
  localStorage.clear() // 清空localStorage
  store.commit("users/SET_MENUS", []) // 重置菜单
  store.commit("users/SET_MENUSOBTAINED", false) // 设置是否获取了菜单标识-false
  // router.push("/login").catch(() => {}) // 一：查控存在独立登录页面
  window.location = loginURL + `?url=${window.location}` // 二: 查控没有单独的登录页面-跳转os登录页面
}
