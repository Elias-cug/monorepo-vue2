const { defineConfig } = require("@vue/cli-service")
const {
  setupWebpackPlugins,
  setupSvg
} = require("../../packages/jat-build/src/plugins")
const { alias } = require("../../alias")

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: setupWebpackPlugins(),
    optimization: {
      // realContentHash: true
    },
    resolve: {
      alias
    }
  },
  chainWebpack: (config) => {
    setupSvg(config)
  }
})
