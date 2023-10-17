import { getAppByUrl } from "../router/url"

function createSessionStorage() {
  const curApp = getAppByUrl()

  function set(key, json) {
    sessionStorage.setItem(`${curApp}-${key}`, json)
  }
  function get(key) {
    return sessionStorage.getItem(`${curApp}-${key}`)
  }
  function remove(key) {
    sessionStorage.removeItem(`${curApp}-${key}`)
  }
  function clear() {
    window.sessionStorage.clear()
  }
  return {
    set,
    get,
    remove,
    clear
  }
}

export const sessionStg = createSessionStorage()
