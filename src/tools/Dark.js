export default class Dark {
  static set (valueDark) {
    const color = {
      getBrand: (name) => getComputedStyle(document.documentElement).getPropertyValue(name),
      setBrand: (name, value) => document.body.style.setProperty(name, value),
      removeBrand: (name) => document.body.style.removeProperty(name)
    }
    color.getAndSetBrand = (name, oldName) => color.setBrand(name, color.getBrand(oldName))
    if (valueDark) {
      color.getAndSetBrand('--border', '--dark-border')
      color.getAndSetBrand('--text-dark', '--dark-text-dark')
      color.getAndSetBrand('--text-light', '--dark-text-light')
      color.getAndSetBrand('--bg-dark', '--dark-bg-dark')
      color.getAndSetBrand('--bg-light', '--dark-bg-light')
    } else {
      color.removeBrand('--border')
      color.removeBrand('--text-dark')
      color.removeBrand('--text-light')
      color.removeBrand('--bg-dark')
      color.removeBrand('--bg-light')
    }
  }
}
