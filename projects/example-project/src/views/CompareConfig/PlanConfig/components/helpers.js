// import store from "@/store"
import { businessObjectData } from "./mock"
import { dbRes } from "@jat-comps/db"

const { initTable, getData, insertData, updateData, deleteData } =
  dbRes("local")

export function initYwdxTable() {
  initTable("t_bdfapz", businessObjectData)
}

export function getYwdxTable() {
  return getData("t_bdfapz")
}

export function insertYwdx(data) {
  insertData("t_bdfapz", data)
}

export function updateYwdx(data) {
  updateData("t_bdfapz", data)
}

export function deleteYwdx(id) {
  deleteData("t_bdfapz", id)
}
