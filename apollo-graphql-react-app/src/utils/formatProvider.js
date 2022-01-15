export const formatProvider = (siteName) => {
  if (siteName.includes('-')) {
    let provider = siteName.split('-')[0].trim()
    return provider
  }
  return siteName
}
