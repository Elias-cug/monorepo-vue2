import { nanoid } from "nanoid"

export const businessObjectData = [
  {
    id: nanoid(8),
    rwmc: "比对任务_2023.09.19 198734",
    bdwja: "被调查人信息",
    bdwjb: "涉黑人员表格最新",
    bdzt: "比对中",
    bdkssj: "2023.09.19 9:20:36",
    bdjssj: "——",
    bdjg: "——"
  },
  {
    id: nanoid(8),
    rwmc: "比对任务_2023.09.16 165529",
    bdwja: "受害人信息",
    bdwjb: "反洗钱人员表修订",
    bdzt: "比对完成",
    bdkssj: "2023.09.16 10:15:10",
    bdjssj: "2023.09.16 10:33:05",
    bdjg: "比对成功"
  },
  {
    id: nanoid(8),
    rwmc: "比对任务_2023.09.13 105632",
    bdwja: "JASS交易明细",
    bdwjb: "反洗钱开户信息",
    bdzt: "比对完成",
    bdkssj: "2023.09.13 15:33:09",
    bdjssj: "2023.09.13 16:03:10",
    bdjg: "比对失败"
  }
]

export const bdjgList = [
  { value: "", label: "全部比对结果" },
  { value: "0", label: "比对成功" },
  { value: "1", label: "比对失败" }
]

export const detailResultData = [
  {
    xm: "钱龙",
    zjhm: "51352419700911183X",
    csrq: "1970.09.11",
    xb: "男",
    mz: "汉",
    hyzk: "已婚"
  }
]
