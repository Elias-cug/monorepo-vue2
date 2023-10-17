import store from "@/store"
export async function asleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export function initTableData() {}

export async function getTableData(table, filter) {
  console.log(table)
  console.log(filter)
  await asleep()
  store.commit("")
}
