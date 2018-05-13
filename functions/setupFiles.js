import createElement from './createElement'

const fileKindToElement = {
  javascript: () => createElement('script', {attributes: {type: 'text/javascript'}}),
  css: () => createElement('link', {attributes: {rel: 'stylesheet', type: 'text/css'}})
}

export function setupFile(id, kind) {
  return new Promise((resolve, reject) => {
    if (typeof kind != 'string' || !fileKindToElement.hasOwnProperty(kind)) return reject('Invalid Kind')
    const path = 'wsi-file'+id
    window.chrome.storage.sync.get(path, items => {
      const file = items[path]
      if (typeof file != 'string' || file.length < 1) return reject('File Not Found')
      const element = fileKindToElement[kind]()
      element.innerHTML = file
      document.body.appendChild(element)
      resolve(element)
    })
  })
}

export function setupFiles(files) {
  return Object.keys(files).map(fileType => setupFile(files[fileType], fileType))
}

export default setupFiles
