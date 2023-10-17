import createInstance from "./instance"

export const HeadersContentType = {
  urlencoded: "application/x-www-form-urlencoded;charset=utf-8",
  json: "application/json;charset=utf-8",
  multipart: "multipart/form-data"
}

const request = createInstance({
  // eslint-disable-next-line no-undef
  baseURL: baseUrl,
  timeout: 10000
})

const Baserequest = createInstance({
  // eslint-disable-next-line no-undef
  baseURL: baseUrl + "",
  timeout: 10000
})

const secondRequest = createInstance({
  // eslint-disable-next-line no-undef
  baseURL: window?.secondUrl || "",
  timeout: 10000
})

export { request, Baserequest, secondRequest }
