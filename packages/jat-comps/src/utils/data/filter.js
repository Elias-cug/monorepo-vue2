import { cloneDeep } from "lodash"
// 树形组件过滤
export function filterTree({ data, prop, searchText }) {
  if (!searchText) {
    return data
  }
  const _tree = cloneDeep(data)
  return _tree.filter(function iter(node) {
    let temp = []
    if (node[prop] && node[prop].includes(searchText)) {
      return true
    }
    if (!Array.isArray(node.children) || node.children.length === 0) {
      return false
    }
    temp = node.children.filter(iter)
    if (temp.length) {
      node.children = temp
      return true
    }
    return false
  })
}
