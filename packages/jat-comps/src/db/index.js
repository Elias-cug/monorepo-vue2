import store from "@/store"
import { localStg } from "@jat-comps/utils"

export function dbResForStore() {
  function initTable(tableId, data) {
    store.commit("dbStore/initDbData", {
      table: tableId,
      data: data
    })
  }

  function getData(tableId) {
    return {
      data: store.getters[`dbStore/allData`][tableId] || [],
      total: (store.getters[`dbStore/allData`][tableId] || []).length
    }
  }

  function insertData(tableId, data) {
    store.commit("dbStore/insertDbData", {
      table: tableId,
      data
    })
  }

  function updateData(tableId, data) {
    store.commit("dbStore/updateDbData", {
      table: tableId,
      data
    })
  }

  function deleteData(tableId, id) {
    store.commit("dbStore/deleteDbData", {
      table: tableId,
      id
    })
  }

  return {
    initTable,
    getData,
    insertData,
    updateData,
    deleteData
  }
}
export function dbResForLocal() {
  function getDb() {
    const db = localStg.get("mock_db")
    if (db) {
      return JSON.parse(db)
    }
    return null
  }
  function setDb(db) {
    const dbJson = JSON.stringify(db)
    localStg.set("mock_db", dbJson)
  }
  function initTable(tableId, data) {
    let db = getDb()
    if (!db) {
      db = {
        [tableId]: data
      }
    } else if (!db[tableId]) {
      db = {
        ...db,
        [tableId]: data
      }
    }
    setDb(db)
  }

  function getData(tableId) {
    const db = getDb()
    if (Array.isArray(db?.[tableId])) {
      return {
        data: db[tableId] || [],
        total: (db[tableId] || []).length
      }
    } else {
      console.error(`当前表不存在${tableId}`)
    }
  }

  function getDataById(tableId, id) {
    const db = getDb()
    if (Array.isArray(db?.[tableId])) {
      console.log(db[tableId])
      return db[tableId].find((item) => item.id === id)
    } else {
      console.error(`当前表不存在${tableId}`)
    }
  }

  function insertData(tableId, data) {
    const db = getDb()
    if (Array.isArray(db?.[tableId])) {
      db[tableId].unshift(data)
      setDb(db)
    } else {
      console.error(`当前表不存在${tableId}`)
    }
  }

  function updateData(tableId, data) {
    const db = getDb()
    if (Array.isArray(db?.[tableId])) {
      const index = db[tableId].findIndex((item) => item.id === data.id)
      if (index > -1) {
        db[tableId].splice(index, 1, data)
      }
      setDb(db)
    } else {
      console.error(`当前表不存在${tableId}`)
    }
  }

  function deleteData(tableId, id) {
    const db = getDb()
    if (Array.isArray(db?.[tableId])) {
      db[tableId] = db[tableId].filter((item) => item.id !== id)
      setDb(db)
    } else {
      console.error(`当前表不存在${tableId}`)
    }
  }

  return {
    initTable,
    getData,
    insertData,
    updateData,
    deleteData,
    getDataById
  }
}

export function dbRes(dbType) {
  if (dbType === "store") {
    return dbResForStore()
  } else if (dbType === "local") {
    return dbResForLocal()
  } else {
    console.error("不合法的数据库类型")
  }
}
