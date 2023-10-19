import { HeadersContentType, Baserequest } from "@jat-comps/utils"

/**
 * @description 数据概览数量统计
 */
export function getdataexceptcountzero(data) {
  return Baserequest({
    url: "/data/getdataexceptcountzero",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    params: data
  })
}
/**
 * @description 获取表支持的模型
 */
export function getTableModle(data) {
  return Baserequest({
    url: "/data/table-model",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    params: data
  })
}

/**
 * @description 获取模型参数
 */
export function modelParam(data) {
  return Baserequest({
    url: "/base/model-param",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    params: data
  })
}

/**
 * @description 获取模型参数
 */
export function DataAnalysisSave(data) {
  return Baserequest({
    url: "/data/filter",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

/**
 * @description 获取模型参数
 */
export function tableEport(data) {
  return Baserequest({
    url: "/base/table-export",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

/**
 * @description 获取模型参数
 */
export function modelRun(data) {
  return Baserequest({
    url: "/base/model-run",
    method: "post",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

/**
 * @description 获取分析结果
 */
export function getAnalysisResult(data) {
  return Baserequest({
    url: "/data/filter",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    params: data
  })
}
/**
 * @description 修改分析结果名称
 */
export function changeAnalysisResultName(data) {
  return Baserequest({
    url: `/data/filter/${data.id}`,
    method: "put",
    headers: {
      "Content-Type": HeadersContentType.json
    },
    data
  })
}

/**
 * @description 修改分析结果名称
 */
export function deleteAnalysisResult(data) {
  return Baserequest({
    url: `/data/filter/${data.id}`,
    method: "delete",
    headers: {
      "Content-Type": HeadersContentType.json
    }
  })
}

/**
 * @description 查询筛选条件
 */
export function getAnalysisResultDetail(data) {
  return Baserequest({
    url: `/data/filter/${data.id}`,
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    }
  })
}

/**
 * @description 获取可视化模板
 */
export function getKSHModel(params) {
  return Baserequest({
    url: "/base/getKSHModel",
    method: "get",
    headers: {
      "Content-Type": HeadersContentType.urlencoded
    },
    params
  })
}
