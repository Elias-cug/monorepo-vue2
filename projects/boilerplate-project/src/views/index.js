export const views = {
  com_menu: {
    path: "/component-display",
    name: "ComponentDisplay",
    redirect: "/component-display/table",
    component: () => import("@/views/ComponentDisplay/Table/index.vue"),
    meta: {
      icon: "menu-sjpzbd",
      layout: "basic"
    }
  },
  com_menu_table: {
    path: "/component-display/table",
    name: "Table",
    component: () => import("@/views/ComponentDisplay/Table/index.vue"),
    meta: {
      title: "Table",
      layout: "basic"
    }
  },
  com_menu_button: {
    path: "/component-display/button",
    name: "Button",
    component: () => import("@/views/ComponentDisplay/Button/index.vue"),
    meta: {
      title: "Button",
      layout: "basic"
    }
  },
  layout_menu: {
    path: "/layout",
    name: "Layout",
    redirect: "/layout/leftright",
    component: () => import("@/views/Layout/LeftRight/index.vue"),
    meta: {
      icon: "menu-sjpzbd",
      title: "布局",
      layout: "basic"
    }
  },
  layout_menu_leftright: {
    path: "/layout/leftright",
    name: "LeftRight",
    component: () => import("@/views/Layout/LeftRight/index.vue"),
    meta: {
      title: "左右布局",
      layout: "basic"
    }
  },
  layout_menu_filter: {
    path: "/layout/button",
    name: "Filter",
    component: () => import("@/views/Layout/FilterLayout/index.vue"),
    meta: {
      title: "过滤布局",
      layout: "basic"
    }
  }
}
