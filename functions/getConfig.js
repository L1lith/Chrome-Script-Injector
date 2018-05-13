function getConfig() {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get("wsiconfig", items => {
      let config = items.wsiconfig
      if (typeof config != 'string' || config.length < 1) return reject('No Valid Config Found')
      try {
        config = JSON.parse(config)
      } catch(error) { return reject('Config Invalid JSON')}
      if (typeof config != 'object' || config === null) return reject('Config not an object')
      resolve(config)
    })
  })
}

export default getConfig
