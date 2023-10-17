export const views = {
  404: {
    components: () => import("./_builtin/404/index.vue")
  },
  500: {
    components: () => import("./_builtin/500/index.vue")
  },
  login: {
    components: () => import("./_builtin/login/index.vue")
  },
  "not-found": {
    components: () => import("./_builtin/NotFound/index.vue")
  }
}

export const assignViews = (appViews) => {
  Object.assign(views, appViews)
  return views
}
