/*
 * Represents a Gantt Chart Bar
 */
class GanttChartBar {
  constructor (opts) {
    opts = Object.assign(opts, {
      x: 0,
      width: 100
      tickSize: 1
    })

    this.x = opts.x
    this.width = opts.width
    this.tickSize = opts.tickSize
    this.realPosition = this.x
  }

  calcRealPosition () {
    return Math.round(this.realPosition)
  }

  moveLeft () {
    this.
  }

  moveRight () {

  }

  expandLeft () {

  }

  expandRight () {

  }
}
