export function setupSvgIconProject() {
  const requireAll = (rc) => rc.keys().forEach(rc)
  const req1 = require.context("./", true, /\.svg$/)
  requireAll(req1)
}
