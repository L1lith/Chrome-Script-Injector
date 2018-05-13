import setupFile from './functions/setupFile'

function setup() {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.get("wsiconfig", items => {
      let config = items.wsiconfig
      if (typeof config != 'string' || config.length < 1) return reject('No Valid Config Found')
      try {
        config = JSON.parse(config)
      } catch(error) { return reject('Config Invalid JSON')}
      if (typeof config != 'object' || config === null) return reject('Config not an object')
      const {files} = config
      if (!Array.isArray(files)) return reject('Files Not Array')
      return Promise.all(files.map(fileConfig => setupFile))
    })
  })
}

function run() {
  console.log('WSI: Setting Up')
  setup().then(() => {
    console.log('WSI: Finished Setting Up')
  }).catch(err => {
    console.log('WSI: Error Setting Up,', err)
  })
}

window.addEventListener('load', run)
