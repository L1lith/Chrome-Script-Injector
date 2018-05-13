function getDomain(url) {
  const hostName = new URL(url).hostname
  let hostNameParts = hostName.split('.')
  hostNameParts = hostNameParts.slice(Math.max(hostNameParts.length - 2, 1))
  return hostNameParts.join('.')
}

export default getDomain
