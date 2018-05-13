function queryCurrentTab() {
  return new Promise((resolve, reject) => {
    window.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length != 1) return reject('Error Finding Active Tab')
      resolve(tabs[0])
    })
  })
}
export default queryCurrentTab
