export function setupSvgIcon() {
  const requireAll = (rc) => rc.keys().forEach(rc)
  const req1 = require.context("../../assets/svg", true, /\.svg$/)
  requireAll(req1)
}
