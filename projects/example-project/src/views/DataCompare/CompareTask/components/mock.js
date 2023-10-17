import { nanoid } from "nanoid"

export const businessObjectData = [
  {
    id: nanoid(8),
    rwmc: "被调查人-->涉黑人员比对",
    bdwja: "被调查人信息",
    bdwjb: "涉黑人员表格最新",
    cjr: "admin",
    cjsj: "2023.09.19 9:22:10",
    bdsj: "2023.09.19 9:22:10"
  },
  {
    id: nanoid(8),
    rwmc: "受害人-->反洗钱人员比对",
    bdwja: "受害人信息",
    bdwjb: "反洗钱人员表修订",
    cjr: "admin",
    cjsj: "2023.09.16 10:15:00",
    bdsj: "2023.09.16 10:15:00"
  },
  {
    id: nanoid(8),
    rwmc: "JASS交易-->反洗钱比对",
    bdwja: "JASS交易明细",
    bdwjb: "反洗钱开户信息",
    cjr: "admin",
    cjsj: "2023.09.13 15:33:09",
    bdsj: "2023.09.13 15:33:09"
  }
]

export const sjdxList = [
  { value: "人员-->人员", label: "人员-->人员" },
  { value: "企业-->企业", label: "企业-->企业" },
  { value: "账户-->账户", label: "账户-->账户" }
]

export const bdgzList = [
  { value: "相同数据", label: "相同数据" },
  { value: "去重合并数据", label: "去重合并数据" }
]
