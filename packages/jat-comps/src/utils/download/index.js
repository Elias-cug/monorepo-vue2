export function downloadMultipart(res, name) {
  let patt = /=utf-8''(\S*)/
  let contentDisposition = decodeURI(res.name)
  let result = contentDisposition.match(patt)
  let FILENAME = result[1]
  console.log("FILENAME")
  console.log(FILENAME)
  const content = res.data
  const blob = new Blob([content])
  if ("download" in document.createElement("a")) {
    let Node = document.createElement("a")
    Node.setAttribute("download", name || FILENAME)
    Node.style.display = "none"
    Node.setAttribute("href", URL.createObjectURL(blob))
    document.body.appendChild(Node)
    Node.click()
    document.body.removeChild(Node)
  } else {
    navigator.msSaveBlob(blob, FILENAME)
  }
}
