import { addHours } from './helpers'

export default function draggable (opts) {
  console.log(opts)

  return function (sel) {
      sel.on('mousemove', function (e) {
        const rect = d3.select(this).node().getBoundingClientRect()
        const ev = d3.event

        if(onLeft(rect, ev)) {
          d3.select(this).classed('on-right', false)
          d3.select(this).classed('on-left', true)
        } else if (onRight(rect, ev)) { 
          d3.select(this).classed('on-right', true)
          d3.select(this).classed('on-left', false)
        } else {
          d3.select(this).classed('on-left', false)
          d3.select(this).classed('on-right', false)
        }
      })
      .call(d3.drag()
          .on('start', dragStart)
          .on('drag', drag)
          .on('end', dragEnd))

    let dragStartX = 0
    let diffX = 0
    let draggingLeft = false
    let draggingRight = false

    function dragStart (d) {
      const rect = d3.select(this).node().getBoundingClientRect()
      const ev = d3.event.sourceEvent

      if(onLeft(rect, ev)) {
        draggingLeft = true
        draggingRight = false
      } else if (onRight(rect, ev)) {
        draggingRight = true
        draggingLeft = false
      } else {
        draggingLeft = false
        draggingRight = false
      }

      dragStartX = parseInt(d3.select(this).attr('x'))
      d3.select(this).raise().classed('grabbing', true)
    }

    function drag (d) {
      const startingX = parseInt(d3.select(this).attr('x'))
      const startingWidth = parseInt(d3.select(this).attr('width'))
      diffX += d3.event.dx

      if (Math.abs(diffX) >= opts.dragTickSize) {
        opts.onBarChange()

        const direction = Math.round(diffX / opts.dragTickSize)
        diffX = 0
        if ( ! draggingLeft && ! draggingRight) {
          const newX = startingX + opts.dragTickSize * direction
          if (! ((newX < opts.min) || (newX + startingWidth > opts.max))) {
            d.start = addHours(d.start, 1 * direction)
            d.end = addHours(d.end, 1 * direction)

            d3.select(this).attr('x', function (d) {
              return newX
            })
          }

        } else if (draggingLeft) {
          const newWidth = startingWidth + opts.dragTickSize * -1 * direction
          const newX = startingX + opts.dragTickSize * direction
          if (! ((newWidth < opts.minWidth) || (newX < opts.min) || (newX + newWidth > opts.max))) {
            d.start = addHours(d.start, 1 * direction)

            d3.select(this).attr('width', function (d) {
              return newWidth
            })
            d3.select(this).attr('x', function (d) {
              return newX
            })
          }
          
        } else {
          const newWidth = startingWidth + opts.dragTickSize * direction
          if (! ((newWidth < opts.minWidth) || (startingX < opts.min) || (startingX + newWidth > opts.max))) {

            d.end = addHours(d.end, 1 * direction)

            d3.select(this).attr('width', function (d) {
              return  newWidth
            })
          }
        }
      }
    }

    function dragEnd (d) {
      d3.select(this).classed('grabbing', false)
    }
  }
}

function onLeft (rect, ev) {
  const clickWidth = (rect.right - rect.left) * .25

  if(ev.x < rect.left + clickWidth) {
    return true
  }
  return false
}

function onRight (rect, ev) {
  const clickWidth = (rect.right - rect.left) * .25

  if(ev.x > rect.right - clickWidth) {
    return true
  }
  return false
}

