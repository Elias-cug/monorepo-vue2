import { nanoid } from "nanoid"

export const businessObjectData = [
  {
    id: nanoid(8),
    sjdxmc: "人员",
    zj: "身份证号",
    zjmc: "身份证号",
    cjr: "admin",
    sjb: "tb_ry",
    cjsj: "2023.09.19 9:20:36",
    zt: 0
  },
  {
    id: nanoid(8),
    sjdxmc: "企业",
    zj: "统一社会信用代码",
    zjmc: "统一社会信用代码",
    cjr: "admin",
    sjb: "tb_qy",
    cjsj: "2023.09.16 10:15:00",
    zt: 0
  },
  {
    id: nanoid(8),
    sjdxmc: "账户",
    zj: "银行卡号",
    zjmc: "银行卡号",
    sjb: "tb_zh",
    cjr: "张支队",
    cjsj: "2023.09.13 15:33:09",
    zt: 1
  }
]

export const tables = [
  { bdm: "tb_bq", bmc: "标签表" },
  { bdm: "tb_ry", bmc: "人员" },
  { bdm: "tb_qy", bmc: "企业" },
  { bdm: "tb_zh", bmc: "账户" },
  { bdm: "tb_tx", bmc: "通信" }
]

export const fileds = {
  tb_bq: [
    { zddm: "标签名称", zdmc: "标签名称" },
    { zddm: "标签ID", zdmc: "标签ID" }
  ],
  tb_ry: [
    { zddm: "身份证号", zdmc: "身份证号" },
    { zddm: "姓名", zdmc: "姓名" }
  ],
  tb_qy: [
    { zddm: "统一社会信用代码", zdmc: "统一社会信用代码" },
    { zddm: "企业名称", zdmc: "企业名称" }
  ],
  tb_zh: [
    { zddm: "银行卡号", zdmc: "银行卡号" },
    { zddm: "姓名", zdmc: "姓名" }
  ],
  tb_tx: [
    { zddm: "手机号", zdmc: "手机号" },
    { zddm: "mac地址", zdmc: "mac地址" }
  ]
}
