/* eslint-disable no-undef */

import axios from "axios"
import { handleBackendError, handleAxiosError } from "./errorHandler"
import { handleServiceResult, handleSpecialType } from "./resultHandler"
// import { Message } from "element-ui"
import { getToken } from "../storage"
import { toLogin } from "../router/url"

// token 失效
function handleExipre() {
  localStorage.clear()
  sessionStorage.clear()
  toLogin()
}

function createInstance(axiosConfig) {
  const instance = axios.create(axiosConfig || {})

  instance.interceptors.request.use(
    (config) => {
      // config.url = baseUrl + config.url
      if (!config.headers.Authorization) {
        // 设置接口token
        config.headers["Authorization"] = getToken()
      }
      return config
    },
    (error) => {
      return { data: null, error }
    }
  )

  instance.interceptors.response.use(
    (response) => {
      const { status } = response
      if (status === 200 || status < 300 || status === 304) {
        const backend = response.data
        // 无权限
        if (backend.code === "600") {
          handleExipre()
          return handleServiceResult(backend, null)
        }
        // 处理文件等特殊的返回请求
        if (handleSpecialType(response)) {
          return handleSpecialType(response)
        }
        if (backend.code !== "200") {
          handleBackendError(backend)
          return handleServiceResult(backend, null)
        }
        return handleServiceResult(null, backend, response)
      }
    },
    (axiosError) => {
      const status = axiosError.response?.status
      if (status === 401) {
        handleExipre()
      }
      return handleAxiosError(axiosError)
    }
  )

  return instance
}

export default createInstance
