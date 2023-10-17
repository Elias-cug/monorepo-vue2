import store from "@/store"
export function clearStorage() {
  store.commit("tabStore/clearOpenTab", true)
  window.localStorage.clear()
  window.sessionStorage.clear()
}
