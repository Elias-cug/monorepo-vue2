// import store from "@/store"
import { businessObjectData } from "./mock"
import { dbRes } from "@jat-comps/db"

const { initTable, getData, insertData, updateData, deleteData } =
  dbRes("local")

export function initYwdxTable() {
  initTable("t_sjdxpz", businessObjectData)
}

export function getYwdxTable() {
  return getData("t_sjdxpz")
}

export function insertYwdx(data) {
  insertData("t_sjdxpz", data)
}

export function updateYwdx(data) {
  updateData("t_sjdxpz", data)
}

export function deleteYwdx(id) {
  deleteData("t_sjdxpz", id)
}
