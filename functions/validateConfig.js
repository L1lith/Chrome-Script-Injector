function validateConfig(config) {
  if (typeof config != 'object' || config === null) return invalid('Config Not Object')
  if (typeof config.siteFiles != 'object' || config.siteFiles === null) return invalid('Site files not an object')
  if (typeof config.globalFiles != 'object' || config.globalFiles === null) return invalid('Global files not an object')
  return {valid: true}
}

function invalid(error) {
  return {valid: false, error}
}

export default validateConfig
