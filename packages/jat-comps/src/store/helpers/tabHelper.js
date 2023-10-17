import store from "@/store"

export function getTabIndexByPath(fullPath) {
  const openTabs = store.tabStore.openTab
  return openTabs.findIndex((item) => item.fullPath === fullPath)
}
