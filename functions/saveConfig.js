import validateConfig from './validateConfig'

function saveConfig(config) {
  return new Promise((resolve, reject) => {
    const {valid, error} = validateConfig(config)
    if (valid !== true) return reject(error)
    
    let configString
    try {
      configString = JSON.stringify(config)
    } catch(error) {
      return reject('Error Stringifying Cofig')
    }
    window.chrome.storage.sync.set({wsiconfig: configString}, () => {
      resolve()
    })
  })
}

export default saveConfig
