import React, { Component } from 'react'
import * as d3 from 'd3'

import { 
  addHours
} from '../helpers'

import draggable from '../draggable'

const WIDTH = 600
const TICK_FORMAT = "%m/%d - %H:%M"
const MARGIN = {
  TOP: 20,
  RIGHT: 40,
  LEFT: 150,
  BOTTOM: 20
}

// DEBUG
window.d3 = d3

export default class D3GanttChart extends Component {
  // component should never rerender (all state is in d3 chart)
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  componentDidMount () {
    console.log(this.props)
    this.chartHeight = this.props.tasks.length * 30

    this.buildChart()
    this.buildXAxis()
    this.buildYAxis()

    // tick size should represent one hour on the gantt chart
    const oneHourAfterStart = new Date(this.props.start.getTime() + 60*60*1000)
    this.dragTickSize = Math.round(this.x(oneHourAfterStart))

    this.addGanttBars()
  }

  render () {
    return (
      <div>
        <div className='text-center' id="gantt-chart"></div>
      </div>
    )
  }

  buildChart () {
    this.vis = d3.select('#gantt-chart')
      .append('svg')
      .attr('class', 'chart')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', this.chartHeight + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', 'translate(100,10)')
  }

  buildXAxis () {
    const minDate = this.props.start 
    const maxDate = this.props.end 

    const x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, WIDTH])
      .clamp(true)

    const xAxis = d3.axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat(TICK_FORMAT))
      .tickSize(8)
      .tickPadding(8)

    // add axis
    this.vis.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${this.chartHeight - MARGIN.TOP + MARGIN.BOTTOM})`)
      .transition()
      .call(xAxis)

    this.x = x
  }

  buildYAxis () {
    // construct y axis scale
    const scaleValues = this.taskNames()
    const yRange = this.props.tasks.map((_, i) => {
      return i * 30
    })

    const y = d3.scaleOrdinal()
      .domain(scaleValues)
      .range(yRange)

    // construct + add y axis to chart
    const yAxis = d3.axisLeft()
      .scale(y)
      .tickSize(8)

    this.vis.append('g')
      .attr('class', 'y axis')
      .transition()
      .call(yAxis)

    // add scale to be called
    this.y = y
  }

  addGanttBars () {
    const self = this

    const dragOpts = {
      dragTickSize: this.dragTickSize,
      onBarChange: () => {
        self.props.onChange(self.getD3Data())
      },
      min: this.x(this.props.start),
      max: this.x(this.props.end),
      minWidth: this.dragTickSize 
    }

    this.chart = this.vis.selectAll('.chart')
    .data(this.props.tasks).enter()
    .append('rect')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('class', 'gantt-bar')
      .attr('x', function (d, i) {
        return self.x(d.start)
      })
      .attr('y', function (d, i) {
        return self.y(d.name)
      })
      .attr('height', function (d) {
        return 25
      })
      .attr('width', function (d) {
        return self.x(d.end) - self.x(d.start)
      }).call(draggable(dragOpts))
  }

  taskNames () {
    return this.props.tasks.map(task => task.name)
  }

  getD3Data () {
    return this.chart.data()
  }
}
