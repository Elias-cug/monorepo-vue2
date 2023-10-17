export function fullScreen(ele) {
  const requestMethod = ele.requestFullscreen || ele.webkitRequestFullScreen
  if (requestMethod) {
    requestMethod.call(ele)
  }
}

export function closeFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

export function disableEscQuit() {}

export function onWinResize() {}
