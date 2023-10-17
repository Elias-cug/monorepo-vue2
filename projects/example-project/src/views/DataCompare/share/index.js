export const acceptFile = ["csv", "xls", "xlsx"]
const acceptFileSize = 10 * 1024 * 1024

export function verifyFileSize(size) {
  return size <= acceptFileSize
}

export function verifyFileExt(str) {
  const par = /\.(\w+)$/
  if (str) {
    const ext = par.exec(str)
    return acceptFile.includes(ext[1])
  }
  return false
}
