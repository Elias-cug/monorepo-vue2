/**
 * 获取年月日 时分秒
 *
 * @param {String} dateStr 时间毫秒数
 * @returns 格式化后的时间
 */
export function getDate(dateStr, format = "yyyy-MM-dd HH:mm:ss") {
  if (!dateStr) return ""
  return formatDate(dateStr, format)
}
/**
 * 格式化时间
 *
 * @param {String} dateStr 时间毫秒数
 * @returns 格式化后的时间
 */
export function formatDate(dateStr, format) {
  if (!dateStr) return ""
  var date = new Date(parseInt(dateStr))
  return date.pattern(format)
}
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: 
 * (new Date()).pattern('yyyy-MM-dd hh:mm:ss.S')==> 2006-07-02 08:09:04.423
 * (new Date()).pattern('yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern('yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern('yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern('yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
    "H+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  var week = {
    0: "\u65e5",
    1: "\u4e00",
    2: "\u4e8c",
    3: "\u4e09",
    4: "\u56db",
    5: "\u4e94",
    6: "\u516d"
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "\u661f\u671f"
          : "\u5468"
        : "") + week[this.getDay() + ""]
    )
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      )
    }
  }
  return fmt
}
Date.prototype.formateD = function (fwt) {
  var year = fwt.getFullYear()
  var month = fwt.getMonth() + 1
  var date = fwt.getDate()
  var hour = fwt.getHours()
  var minute = fwt.getMinutes()
  var seconds = fwt.getSeconds()
  return year + "-" + month + "-" + date + "-" + hour + minute + seconds
}
/**
 * 千分位数字转换
 */
export function ThousandsNum(num) {
  let reg = /\d{1,3}(?=(\d{3})+$)/g
  return String(num).replace(reg, "$&,")
}
/**
 * @description 将arraybuffer转换成base64
 * @param {*} buffer
 * @returns
 */
export function arrayBufferToBase64(buffer) {
  let binary = ""
  let bytes = new Uint8Array(buffer)
  for (let len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}
/**
 * @description 处理菜单接口数据变成树结构
 * @param {*} data
 * @param {*} fjZydm
 * @returns
 */
export function buildTree(data, fjZydm = "0") {
  const children = data
    .filter((item) => item.fjZydm === fjZydm)
    .sort((a, b) => (a.px || 0) - (b.px || 0))
    .map((item) => ({
      ...item,
      hasChildren: !!data.find((d) => d.fjZydm === item.zydm),
      children: buildTree(data, item.zydm)
    }))
  return children
}
/**
 * @description 获取树结构的叶子节点
 * @param {*} tree
 */
export function getLeafNodes(tree) {
  let LeafNodes = []
  function traverse(node) {
    if (!node.children || node.children.length === 0) {
      LeafNodes.push(node)
    } else {
      node.children.forEach((child) => traverse(child))
    }
  }
  if (Array.isArray(tree)) {
    tree.forEach((t) => traverse(t))
  } else {
    traverse(tree)
  }
  return LeafNodes
}
/**
 * @description 计算表头宽度(后端没给宽度前端自己计算)
 * @param {*} name 表格label
 * @param {*} width 后端反回宽度
 * @param {*} item 后端反回表格数据
 */
export function renderHeaderWidth(name, width, item) {
  if (width !== 0) {
    return width
  }
  let realWidth = 0
  let span = document.createElement("span")
  span.innerText = name
  document.body.appendChild(span)
  if (item.sfzcpx === "Y") {
    realWidth = span.getBoundingClientRect().width + 46
  } else if (item.sfss === "Y") {
    realWidth = span.getBoundingClientRect().width + 40
  } else {
    realWidth = span.getBoundingClientRect().width + 22
  }
  document.body.removeChild(span)
  return realWidth
}
/**
 * @description clickoutside 指令
 */
export const clickoutside = {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener("click", documentHandler)
  },
  unbind(el) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
/**
 * @description 判断两个对象的某些值是否相同
 * @param {*} obj1
 * @param {*} obj2
 * @param {*} keys
 * @returns
 */
export function isEqual(obj1, obj2, keys) {
  for (let key of keys) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }
  return true
}

/**
 * @description 对象中每一项都不是空值
 * @param {*} obj
 * @returns
 */
export function isObjectNotEmpty(obj) {
  for (let key in obj) {
    if (obj[key] === "") {
      return false
    }
  }
  return true
}
export function groupBy(arr, value) {
  const result = []
  arr.forEach((item) => {
    const key = item[value]
    const group = result.find((g) => g.key === key)
    if (group) {
      group.items.push(item)
    } else {
      result.push({ key, items: [item] })
    }
  })
  return result
}
/**
 * @description 下载文件方法
 * @param {Blob} blob 文件流
 * @param {String} fileName 文件名称
 */
export function downloadFile(blob, fileName) {
  if ("download" in document.createElement("a")) {
    const elink = document.createElement("a")
    elink.href = URL.createObjectURL(blob)
    elink.download = fileName
    elink.style.display = "none"
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  } else {
    navigator.msSaveBlob(blob, fileName)
  }
}

export function removeHtmlTags(htmlString) {
  var tempDiv = document.createElement("div")
  tempDiv.innerHTML = htmlString
  return tempDiv.textContent || tempDiv.innerText || ""
}

/**
 * @description 转数字 type = 0 转万元  1转亿元
 * @param {*} num
 * @param {*} type
 * @returns
 */
export function calculateNum(num, type = "0") {
  // 转万元
  if (type === "0") {
    return ((parseFloat(num) / 10000) * 1).toFixed(2)
  } else {
    // 转亿元
    return ((parseFloat(num) / 10000 / 10000) * 1).toFixed(2)
  }
}
