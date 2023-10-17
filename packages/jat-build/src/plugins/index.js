const path = require("path")
const UnoCSS = require("@unocss/webpack").default
const { getCurrentPath, getSrcPath } = require("../utils")

const projectSrcPath = getSrcPath()
const jatCompsSvgPath = getCurrentPath("../../../jat-comps/src/assets/svg")
const projectSvgPath = path.join(projectSrcPath, "/assets/svg")

function setupWebpackPlugins() {
  const plugins = [UnoCSS()]
  return plugins
}

function setupSvg(config) {
  config.module
    .rule("svg")
    .exclude.add(jatCompsSvgPath)
    .end()
    .exclude.add(projectSvgPath)
    .end()

  config.module
    .rule("icons")
    .test(/\.svg$/)
    .include.add(jatCompsSvgPath)
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId: "icon-[name]"
    })
    .end()

  config.module
    .rule("icons2")
    .test(/\.svg$/)
    .include.add(projectSvgPath)
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId: "local-[name]"
    })
    .end()
}

module.exports = { setupWebpackPlugins, setupSvg }
