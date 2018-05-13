import setupFile from './functions/setupFile'
import getConfig from './functions/getConfig'

function setup() {
  return new Promise((resolve, reject) => {
    getConfig().then(config => {
      const {files} = config
      if (!Array.isArray(files)) return reject('Files Not Array')
      return Promise.all(files.map(fileConfig => setupFile))
    }).catch(reject)
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
