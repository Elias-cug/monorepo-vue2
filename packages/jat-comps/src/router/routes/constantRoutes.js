export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@jat-comps/views/_builtin/login/index.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@jat-comps/views/_builtin/404/index.vue")
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@jat-comps/views/_builtin/NotFound/index.vue")
  }
]
