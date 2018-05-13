import createElement from './createElement'

const fileKindToElement = {
  javascript: () => createElement('script'),
  css: () => createElement('link', {attributes: {rel: 'stylesheet', type: 'text/css'}})
}

function setupFile({kind, path}) {
  return Promise((resolve, reject) => {
    if (typeof kind != 'string' || !fileKindToElement.hasOwnProperty(kind)) return reject('Invalid Kind')
    window.chrome.storage.sync.get(path, items => {
      const file = items[path]
      if (typeof file != 'string' || string.length < 1) return reject('File Not Found')
      const element = fileKindToElement[kind]()
      element.innerHTML = file
      document.body.appendChild(element)
      resolve(element)
    })
  })
}

export default setupFile
