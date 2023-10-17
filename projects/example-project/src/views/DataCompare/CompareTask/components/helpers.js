// import store from "@/store"
import { businessObjectData } from "./mock"
import { dbRes } from "@jat-comps/db"

const { initTable, getData, insertData, updateData, deleteData } =
  dbRes("local")

export function initYwdxTable() {
  initTable("t_bdrw", businessObjectData)
}

export function getYwdxTable() {
  return getData("t_bdrw")
}

export function insertYwdx(data) {
  insertData("t_bdrw", data)
}

export function updateYwdx(data) {
  updateData("t_bdrw", data)
}

export function deleteYwdx(id) {
  deleteData("t_bdrw", id)
}
