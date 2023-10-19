import { request, HeadersContentType } from "@jat-comps/utils"

// 获取碰撞比对结果
export function getCompareResultApi(data) {
  return request({
    url: "/bdrz/page",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

// 获取碰撞比对结果详情
export function getCompareResultDetailApi(data) {
  return request({
    url: "/bdrz/info",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    params: data
  })
}

// 获取表头
export function getTableColumnApi(data) {
  return request({
    url: "/bxx/getBzdpz",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    data
  })
}

// 获取表数据
export function getTableDataApi(data) {
  return request({
    url: "/getAppMenu",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    params: {
      yydm: data
    }
  })
}

// 获取比对任务
export function getCompareTaskApi(data) {
  return request({
    url: "/rw/page",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

// 新增任务
export function addTaskApi(data) {
  return request({
    url: "/rw",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

// 编辑任务
export function editTaskApi(data) {
  return request({
    url: "/rw",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

// 删除任务
export function deleteTaskApi(data) {
  return request({
    url: "/rw/delete",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    params: data
  })
}

// 文件上传
export function uploadFileApi(data) {
  return request({
    url: `/file/upload`,
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.multipart
    },
    data
  })
}

// 文件导出
export function downLoadFileApi(data) {
  return request({
    url: "/bdjg/export",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    responseType: "blob",
    data
  })
}

// 执行比对
export function compareApi(params, formData) {
  return request({
    url: "/run/execute",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.multipart
    },
    params,
    data: formData
  })
}

// 获取某一任务比对结果
export function getResultByTaskApi(data) {
  return request({
    url: "bdjg/page",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

// 获取业务对象
export function getBusinessObjectListApi(data) {
  return request({
    url: "/sjdx/all",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    data
  })
}

// 获取业务对象详情
export function getBusinessObjectDetail(data) {
  return request({
    url: "/sjdx/info",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    params: data
  })
}

// 获取可视化sql
export function getTableDataSqlApi(data) {
  return request({
    url: "/show/table-data-sql",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    data
  })
}

/**
 * @description 获取可视化模板
 */
export function getKSHModelApi(params) {
  return request({
    url: "/show/getKSHModel",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    params
  })
}
