import { Message } from "element-ui"
import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MESSAGE,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG,
  ERROR_STATUS
} from "./codeConfig"

const errorMsgDuration = 3 * 1000
const errorMsgStack = new Map([])
function addErrorMsg(error) {
  errorMsgStack.set(error.code, error.msg)
}
function removeErrorMsg(error) {
  errorMsgStack.delete(error.code)
}
function hasErrorMsg(error) {
  return errorMsgStack.has(error.code)
}

export function showErrorMsg(error) {
  if (!error.msg || hasErrorMsg(error)) {
    return
  }
  addErrorMsg(error)
  window.console.warn(error.code, error.msg)
  Message({
    message: error.msg,
    type: "error",
    duration: errorMsgDuration
  })
  setTimeout(() => {
    removeErrorMsg(error)
  }, errorMsgDuration)
}

export function exeStrategyActions(actions) {
  actions.some((item) => {
    const [flag, action] = item
    if (flag) {
      action()
    }
    return flag
  })
}

export function handleAxiosError(axiosError) {
  const error = {
    type: "axios",
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MESSAGE
  }

  const actions = [
    [
      !window.navigator.onLine || axiosError.message === "Network Error",
      () => {
        Object.assign(error, {
          code: NETWORK_ERROR_CODE,
          msg: NETWORK_ERROR_MSG
        })
      }
    ],
    [
      axiosError.code === REQUEST_TIMEOUT_CODE &&
        axiosError.message.includes("timeout"),
      () => {
        Object.assign(error, {
          code: REQUEST_TIMEOUT_CODE,
          msg: REQUEST_TIMEOUT_MSG
        })
      }
    ],
    [
      Boolean(axiosError.response),
      () => {
        const errorCode =
          axiosError.response?.status || DEFAULT_REQUEST_ERROR_CODE
        const msg =
          axiosError.response?.data?.message || ERROR_STATUS[errorCode]
        Object.assign(error, { code: errorCode, msg })
      }
    ]
  ]

  exeStrategyActions(actions)

  showErrorMsg(error)
  return { error, data: null }
}

export function handleBackendError(backendResult) {
  const error = {
    type: "backend",
    code: backendResult.code,
    msg: backendResult.msg
  }
  showErrorMsg(error)
}
