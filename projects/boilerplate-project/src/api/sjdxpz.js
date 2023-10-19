import { HeadersContentType, request } from "@jat-comps/utils"

/**
 * @description 数据对象列表
 * @param {*} data
 * @returns
 */
export function getOverviewStatistics(data) {
  return request({
    url: "/sjdx/querySjdxList",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}
/**
 * @description 表信息
 * @param {*} data
 * @returns
 */
export function queryTableList(data) {
  return request({
    url: "/table/queryTableList",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    data
  })
}
/**
 * @description 字段信息
 * @param {*} data
 * @returns
 */
export function queryColumnList(data) {
  return request({
    url: "/table/queryColumnList",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    data
  })
}
/**
 * @description 字段信息
 * @param {*} data
 * @returns
 */
export function addOrUpdateSjdx(data) {
  return request({
    url: "/sjdx/addOrUpdateSjdx",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
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
    url: "/sjdx/delSjdx",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}
