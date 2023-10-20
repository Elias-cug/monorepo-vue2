const menu = [
  {
    map: {
      zydm: "com_menu",
      zymc: "组件"
    },
    children: [
      {
        map: {
          zydm: "com_menu_table",
          zymc: "表格组件"
        },
        children: []
      },
      {
        map: {
          zydm: "com_menu_button",
          zymc: "按钮组件"
        },
        children: []
      }
    ]
  },
  {
    map: {
      zydm: "layout_menu",
      zymc: "布局"
    },
    children: [
      {
        map: {
          zydm: "layout_menu_leftright",
          zymc: "左右布局"
        },
        children: []
      },
      {
        map: {
          zydm: "layout_menu_filter",
          zymc: "过滤布局"
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
