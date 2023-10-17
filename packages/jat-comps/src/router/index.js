import Vue from "vue"
import VueRouter from "vue-router"
import { constantRoutes } from "./routes/constantRoutes"

const isProduction = process.env.NODE_ENV === "production"

const default_routes = constantRoutes.filter((item) => {
  if (isProduction) {
    return item.name !== "login"
  } else {
    return true
  }
})

Vue.use(VueRouter)

/**
 * @description 创建路由
 * @returns
 */
const createRouter = () => {
  return new VueRouter({
    mode: "hash",
    scrollBehavior: () => ({ y: 0 }),
    routes: default_routes
  })
}
const router = createRouter()
/**
 * @description 重置路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
