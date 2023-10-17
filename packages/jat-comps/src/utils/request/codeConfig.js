export const DEFAULT_REQUEST_ERROR_CODE = "DEFAULT"
export const DEFAULT_REQUEST_ERROR_MESSAGE = "请求错误"
export const NETWORK_ERROR_CODE = "NETWORK_ERROR"
export const NETWORK_ERROR_MSG = "网络不可用"
export const REQUEST_TIMEOUT_CODE = "ECONNABORTED"
export const REQUEST_TIMEOUT_MSG = "请求超时"
export const ERROR_STATUS = {
  400: "请求错误，请刷新页面或稍后再试",
  401: "验证信息出错，请重新登录",
  404: "请求的资源不存在",
  408: "请求超时，请刷新页面或稍后再试",
  500: "服务器访问出错，请刷新页面或稍后再试",
  502: "网关错误，请刷新页面或稍后再试",
  503: "服务器访问出错，请刷新页面或稍后再试",
  504: "网关超时",
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MESSAGE
}
