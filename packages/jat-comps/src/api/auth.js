import { request } from "../utils"

export const loginApi = (username, password) => {
  return request({
    url: "http://192.168.1.36:9011/jat-portal/login",
    method: "post",
    headers: {
      "Content-Type": "	application/json;charset=UTF-8"
    },
    params: { username, password }
  })
}
