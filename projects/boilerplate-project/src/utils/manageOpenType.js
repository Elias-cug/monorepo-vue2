import { MessageBox } from "element-ui"
let manageOpenType = async (route, openTab, data, confirm, cancel) => {
  let flag = false
  let name = ""
  openTab.forEach((i) => {
    if (i.path === route.path) {
      if (i.meta.openStatus) {
        name = i.name.split("-")[1]
        flag = true
      }
    }
  })
  if (flag) {
    // console.log(
    //   "说明打开过发起或者修改或查看页面。 需要新打开的页面：",
    //   data,
    //   "旧页面："
    // )
    try {
      await MessageBox.confirm(
        `当前已打开${name},确定覆盖当前页面嘛？`,
        "提示",
        {
          closeOnHashChange: false
        }
      )
      confirm()
    } catch (e) {
      // console.log(e)
      cancel()
    }
  } else {
    confirm()
  }
}
export default manageOpenType
