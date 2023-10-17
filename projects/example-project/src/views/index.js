export const views = {
  sjpz_menu_sjpzbd: {
    path: "/jat-sjpzbd/sjpzdb",
    name: "BatchCompare",
    component: () => import("@/views/DataCompare/BatchCompare/index.vue"),
    meta: {
      title: "数据碰撞比对",
      icon: "menu-sjpzbd",
      layout: "basic"
    }
  },
  sjpz_menu_plpzbd: {
    path: "/jat-sjpzbd/plpzbd",
    name: "BatchCompare",
    component: () => import("@/views/DataCompare/BatchCompareNew/index.vue"),
    meta: {
      title: "数据碰撞比对",
      layout: "basic"
    }
  },
  sjpz_menu_pzbdjg: {
    path: "/jat-sjpzbd/pzbdjg",
    name: "CompareResult",
    component: () => import("@/views/DataCompare/CompareResult/index.vue"),
    meta: {
      title: "碰撞比对结果",
      layout: "basic"
    }
  },
  sjpz_menu_pzbdxq: {
    path: "/jat-sjpzbd/pzbdxq",
    name: "CompareResult",
    component: () =>
      import("@/views/DataCompare/CompareResult/CompareDetail.vue"),
    meta: {
      title: "碰撞比对详情",
      layout: "basic",
      hidden: true
    }
  },
  sjpz_menu_kshstt: {
    path: "/jat-sjpzbd/kshstt",
    name: "VisualEntity",
    component: () =>
      import("@/views/DataCompare/CompareResult/VisualEntity.vue"),
    meta: {
      title: "实体图",
      layout: "basic",
      hidden: true
    }
  },
  sjpz_menu_kshgxt: {
    path: "/jat-sjpzbd/kshgxt",
    name: "VisualRelationship",
    component: () =>
      import("@/views/DataCompare/CompareResult/VisualRelationship.vue"),
    meta: {
      title: "关系图",
      layout: "basic",
      hidden: true
    }
  },
  sjpz_menu_pzbdrw: {
    path: "/jat-sjpzbd/pzbdrw",
    name: "CompareTask",
    component: () => import("@/views/DataCompare/CompareTask/index.vue"),
    meta: {
      title: "碰撞比对任务",
      layout: "basic",
      isKeepAlive: true
    }
  },
  sjpz_menu_pzbdpz: {
    path: "/jat-sjpzbd/pzbdpz",
    name: "CompareConfig",
    component: () => import("@/views/CompareConfig/PlanConfig/index.vue"),
    meta: {
      title: "碰撞比对配置",
      icon: "menu-pzbdpz",
      layout: "basic",
      isKeepAlive: true
    }
  },
  sjpz_menu_bdfapz: {
    path: "/jat-sjpzbd/bdfapz",
    name: "PlanConfig",
    component: () => import("@/views/CompareConfig/PlanConfig/index.vue"),
    meta: {
      title: "比对方案配置",
      layout: "basic"
    }
  },
  sjpz_menu_sjdxpz: {
    path: "/jat-sjpzbd/sjdxpz",
    name: "ObjectConfig",
    component: () => import("@/views/CompareConfig/ObjectConfig/index.vue"),
    meta: {
      title: "数据对象配置",
      layout: "basic"
    }
  }
}
