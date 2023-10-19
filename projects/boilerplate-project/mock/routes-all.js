const menu = [
  {
    id: "sjpz_menu_sjpzbd",
    pid: "0",
    map: {
      yydz: "http://192.168.1.36:8084/#/",
      zydm: "com_menu",
      yydm: "jat-sjpzbd",
      zymc: "组件",
      zydz: "",
      zyms: "",
      zylx: "0",
      zytb: "",
      pzydm: "0",
      px: 1,
      dkfs: "0",
      zt: "0",
      cjrbh: "admin",
      cjrxm: "管理员",
      cjsj: "2023-09-15 06:34:55",
      gxsj: "2023-09-15 06:34:55",
      sfnbxt: " "
    },
    children: [
      {
        id: "sjpz_menu_plpzbd",
        pid: "sjpz_menu_sjpzbd",
        map: {
          yydz: "http://192.168.1.36:8084/#/",
          zydm: "com_menu_list",
          yydm: "jat-sjpzbd",
          zymc: "列表组件",
          zydz: "",
          zyms: "",
          zylx: "0",
          zytb: "",
          pzydm: "sjpz_menu_sjpzbd",
          px: 1,
          dkfs: "0",
          zt: "0",
          cjrbh: "admin",
          cjrxm: "管理员",
          cjsj: "2023-09-15 06:35:11",
          gxsj: "2023-09-15 06:35:11",
          sfnbxt: " "
        },
        children: []
      }
    ]
  }
]
const menuList = {
  code: "200",

  msg: "请求成功",

  data: JSON.stringify({ yydm: "jat-sjpzbd", menu: JSON.stringify(menu) })
}

export default menuList
