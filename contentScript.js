import setupFiles from './functions/setupFiles'
import getConfig from './functions/getConfig'
import getDomain from './functions/getDomain'

function setup() {
  return new Promise((resolve, reject) => {
    getConfig().then(config => {
      const siteFiles = config.siteFiles[getDomain(window.location.href)] || {}
      const {globalFiles} = config

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

document.addEventListener('load', run)
