import setupFile from './functions/setupFile'
import getConfig from './functions/getConfig'

function setup() {
  return new Promise((resolve, reject) => {
    getConfig().then(config => {
      const siteFiles = config[getDomain(window.location.href)]
      const {globalFiles} = config
      console.log({siteFiles, globalFiles})
      return Promise.all([siteFiles, globalFiles].map(setupFiles))
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
