// import store from "@/store"
import { businessObjectData } from "./mock"
import { dbRes } from "@jat-comps/db"

const { initTable, getData, insertData, updateData, deleteData, getDataById } =
  dbRes("local")

export function initYwdxTable() {
  initTable("t_bdjg", businessObjectData)
}

export function getYwdxTable() {
  return getData("t_bdjg")
}

export function insertYwdx(data) {
  insertData("t_bdjg", data)
}

export function updateYwdx(data) {
  updateData("t_bdjg", data)
}

export function deleteYwdx(id) {
  deleteData("t_bdjg", id)
}

export function getYwdxById(id) {
  return getDataById("t_bdjg", id)
}
