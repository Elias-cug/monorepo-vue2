/**
 * @author zzl81cn
 * @description 公共正则
 * */

// 手机号
const MOBILE = /^[1]([2-9])[0-9]{9}$/

// 带小数数值（金额等）
const NORMAL_NUM = new RegExp("^[0-9]+([.]{1}[0-9]+){0,1}$")
// table html标签
const ORIGIN_TABLE = /<table>/g
// image html标签
const ORIGIN_IMAGE = /<img/g

// 常规字符
const NUMABCRegExp = new RegExp("^[A-Za-z0-9-_.\u4e00-\u9fa5]+$")
// 常规字符（不含中文）
const NUMABCUnCHSRegExp = new RegExp("^[A-Za-z0-9-_.]+$")
// 常规字符带冒号
const NUMABCAfterRegExp = new RegExp("^[A-Za-z0-9-_/:.\u4e00-\u9fa5]+$")
// const SymbolRegExp = new RegExp("[`~!@#$%^&*()_+|\\[]{}");

// 常规字符下划线
const NUMABCUnRegExp = new RegExp("^[A-Za-z0-9_\u4e00-\u9fa5]+$")
// 字段数据类型匹配
const INT_STR = new RegExp("int", "i")
const NUM_STR = new RegExp("num", "i")
const DECIMAL_STR = new RegExp("decimal", "i")
const DOUBLE_STR = new RegExp("double", "i")
const FLOAT_STR = new RegExp("float", "i")
const RS_STR = new RegExp("rs", "i")
// 查找like
const LIKE_STR = new RegExp("like", "i")
// 标签类
// 未使用
// const TABLE_REGEXP = new RegExp("(i?)(\<table)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", "gmi")
// 有style属性的table标签
const TABLE_UNS_REGEXP = new RegExp("(i?)(<table.*?style=['\"])([^>]+>)", "gmi")
// 有style属性的th标签
const TH_UNS_REGEXP = new RegExp("(i?)(<th.*?style=['\"])([^>]+>)", "gmi")
// 有style属性的td标签
const TD_UNS_REGEXP = new RegExp("(i?)(<td.*?style=['\"])([^>]+>)", "gmi")
// &nbsp; 空格
// const WHITE_SPACE_EXP = /[]|[&nbsp;]/g;
const WHITE_SPACE_EXP = new RegExp("/[]|[&nbsp;]", "g")

function mobileRegExp() {
  return MOBILE
}
function originTableRegExp() {
  return ORIGIN_TABLE
}
function originImageRegExp() {
  return ORIGIN_IMAGE
}

function normalNumRegExp() {
  return NORMAL_NUM
}
function numAbcRegExp() {
  return NUMABCRegExp
}
function numAbcUnCHSRegExp() {
  return NUMABCUnCHSRegExp
}
function numAbcAfterRegExp() {
  return NUMABCAfterRegExp
}
function numABCUnRegExp() {
  return NUMABCUnRegExp
}
function intStrRegExp() {
  return INT_STR
}
function numStrRegExp() {
  return NUM_STR
}
function decimalStrRegExp() {
  return DECIMAL_STR
}
function doubleStrRegExp() {
  return DOUBLE_STR
}
function floatStrRegExp() {
  return FLOAT_STR
}
// HTML tags
function tableUnsRegExp() {
  return TABLE_UNS_REGEXP
}
function thUnsRegExp() {
  return TH_UNS_REGEXP
}
function tdUnsRegExp() {
  return TD_UNS_REGEXP
}
function rsStrRegExp() {
  return RS_STR
}
function likeStrRegExp() {
  return LIKE_STR
}
function whiteSpaceEXP() {
  return WHITE_SPACE_EXP
}

export {
  mobileRegExp,
  originTableRegExp,
  originImageRegExp,
  normalNumRegExp,
  numAbcRegExp,
  numAbcUnCHSRegExp,
  numAbcAfterRegExp,
  numABCUnRegExp,
  intStrRegExp,
  numStrRegExp,
  decimalStrRegExp,
  doubleStrRegExp,
  floatStrRegExp,
  tableUnsRegExp,
  thUnsRegExp,
  tdUnsRegExp,
  rsStrRegExp,
  likeStrRegExp,
  whiteSpaceEXP
}
