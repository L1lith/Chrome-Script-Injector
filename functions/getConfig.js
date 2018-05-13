import validateConfig from './validateConfig'

function getConfig() {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get("wsiconfig", items => {
      let config = items.wsiconfig
      if (typeof config != 'string' || config.length < 1) return reject('No Valid Config Found')
      try {
        config = JSON.parse(config)
      } catch(error) { return reject('Config Invalid JSON')}
      const {valid, error} = validateConfig(config)
      if (valid !== true) return reject(error)
      resolve(config)
    })
  })
}

export default getConfig
