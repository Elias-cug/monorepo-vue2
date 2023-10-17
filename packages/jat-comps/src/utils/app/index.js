export function getAppSlugs() {
  const appSlugsStr = process.env.VUE_APP_PROJECT_SLUGS
  const appSlugArr = appSlugsStr.split(",")
  const defaultSlug = process.env.VUE_APP_DEFAULT_APP_SLUG || appSlugArr[0]
  return {
    appSlugs: appSlugArr,
    defaultSlug
  }
}
