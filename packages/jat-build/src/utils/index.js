const path = require("path")

function getRootPath() {
  return path.resolve(process.cwd())
}

function getSrcPath(srcName = "src") {
  const rootPath = getRootPath()
  return path.join(rootPath, srcName)
}

function getCurrentPath(srcName = "../") {
  return path.join(__dirname, srcName)
}

module.exports = {
  getRootPath,
  getSrcPath,
  getCurrentPath
}
