export default class Scroll {
  // constructor () {}

  /**
   * @param { string } id: id for element
   * @param { object } options: options scroll
   * @param { number } options.offset: element offset
   * @param { number } options.duration: animation duration in ms
   */
  static to (id = null, options = {}) {
    const opt = {
      offset: 0,
      duration: 1000,
      ...options
    }
    const { duration, offset } = opt
    if (!id) return
    const element = document.getElementById(id)
    if (!element) return
    const to = element.offsetTop + offset

    const startY = window.scrollY || window.pageYOffset
    const distanceY = to - startY
    const startTime = new Date().getTime()

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime
      const newY = easeInOutQuart(time, startY, distanceY, duration)
      if (time >= duration) clearInterval(timer)
      window.scroll(0, newY)
    }, 1000 / 60) // 60 fps
  }
}

function easeInOutQuart (time, from, distance, duration) {
  if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from
  return -distance / 2 * ((time -= 2) * time * time * time - 2) + from
}
