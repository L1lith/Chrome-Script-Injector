function saveFile(id, content) {
  return new Promise((resolve, reject) => {
    const set = {}
    set['wsi-file'+id] = content
    window.chrome.storage.sync.set(set, resolve)
  })
}

export default saveFile
