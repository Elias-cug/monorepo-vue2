// import { resolve } from 'path'
const { resolve } = require("path")

const r = p => resolve(__dirname, p)

function getRootPath() {
  return resolve(process.cwd())
}

const alias = {
  "@cl-app": `${getRootPath()}/src`,
  "~": `${getRootPath()}`,
  "@jat-comps": r("./packages/jat-comps/src/"),
  "@jat-build": r("./packages/jat-build/src/")
}

module.exports = { alias }
