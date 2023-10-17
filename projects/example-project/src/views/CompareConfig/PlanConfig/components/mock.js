import { nanoid } from "nanoid"

export const businessObjectData = [
  {
    id: nanoid(8),
    famc: "人员比对方案",
    sjdx: "人员-->人员",
    bdgz: "相同数据",
    cjr: "admin",
    cjsj: "2023.09.19 9:20:36",
    zt: 0
  },
  {
    id: nanoid(8),
    famc: "企业比对方案",
    sjdx: "企业-->企业",
    bdgz: "去重合并数据",
    cjr: "admin",
    cjsj: "2023.09.16 10:15:00",
    zt: 0
  },
  {
    id: nanoid(8),
    famc: "账户比对方案",
    sjdx: "账户-->账户",
    bdgz: "去重合并数据",
    cjr: "admin",
    cjsj: "2023.09.13 15:33:09",
    zt: 1
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
