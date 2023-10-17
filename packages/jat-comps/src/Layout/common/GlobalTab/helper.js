import store from "@/store"

function closeOther({ tab }) {
  store.commit("tabStore/closeOther", tab)
}

function closeRight(index) {
  console.log(index)
}

function closeLeft(index) {
  console.log(index)
}

function closeAll(index) {
  console.log(index)
}

export const tabOperates = [
  { key: "other", title: "关闭其他", action: closeOther },
  { key: "other", title: "关闭左侧", action: closeLeft, hidden: true },
  { key: "other", title: "关闭右侧", action: closeRight, hidden: true },
  { key: "all", title: "关闭全部", action: closeAll, hidden: true }
]

export const showTabOperates = tabOperates.filter((item) => !item.hidden)
