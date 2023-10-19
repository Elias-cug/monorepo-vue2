import { HeadersContentType, request } from "@jat-comps/utils"

/**
 * @description 比对方案列表
 * @param {*} data
 * @returns
 */
export function queryBdfaList(data) {
  return request({
    url: "/bdfa/queryBdfaList",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

/**
 * @description add-update数据对象
 * @param {*} data
 * @returns
 */
export function addOrUpdateSjdx(data) {
  return request({
    url: "/bdfa/addOrUpdateSjdx",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

/**
 * @description 查找数据对象
 * @param {*} data
 * @returns
 */
export function querySjdx(data) {
  return request({
    url: "/bdfa/querySjdx",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    data
  })
}

/**
 * @description 删除数据对象
 * @param {*} data
 * @returns
 */
export function delSjdx(data) {
  return request({
    url: "/bdfa/delSjdx",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}
