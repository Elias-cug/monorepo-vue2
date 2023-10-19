export const views = {
  com_menu: {
    path: "/com",
    name: "list",
    redirect: "/com/list",
    component: () => import("@/views/com/list/index.vue"),
    meta: {
      title: "列表页面",
      icon: "menu-sjpzbd",
      layout: "basic"
    }
  },
  com_menu_list: {
    path: "/com/list",
    name: "list",
    component: () => import("@/views/com/list/index.vue"),
    meta: {
      title: "列表页面",
      icon: "menu-sjpzbd",
      layout: "basic"
    }
  }
}
