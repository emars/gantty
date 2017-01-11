import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

function chartCols () {
  return [
    {
      id: 'Task ID',
      type: 'string'
    },
    {
      id: 'Task Name',
      type: 'string'
    },
    {
      id: 'Resource',
      type: 'string'
    },
    {
      id: 'Start Date',
      type: 'date'
    },
    {
      id: 'End Date',
      type: 'date'
    },
    {
      id: 'Duration',
      type: 'number'
    },
    {
      id: 'Percent Complete',
      type: 'number'
    },
    {
      id: 'Dependencies',
      type: 'string'
    },
  ]
}

function chartRows (tasks) {
  return tasks.map((task) => {
    return [
      task.id.toString(),
      task.name,
      'tasks',
      new Date(task.start),
      new Date(task.end),
      null,
      100,
      null
    ]
  })
}

function createChartData (tasks) {
  const data = new google.visualization.DataTable();
  
  data.addColumn('string', 'Task ID')
  data.addColumn('string', 'Task Name')
  data.addColumn('string', 'Resource')
  data.addColumn('date', 'Start Date')
  data.addColumn('date', 'End Date')
  data.addColumn('number', 'Duration')
  data.addColumn('number', 'Percent Complete')
  data.addColumn('string', 'Dependencies')

  tasks.forEach((task) => {
    const id = task.id
    const name = task.name
    const resource = 'tasks'
    const startDate = task.start
    const endDate = task.end
    const duration = null
    const percentComplete = 100
    const dependencies = null

    data.addRow(id, name, resource, startDate, endDate, duration, percentComplete, dependencies)
  })
}


export default class GanttChart extends Component {
  chartEvents () {
    return [
      {
        eventName: 'onmouseover',
        callback: (e) => {
          console.log('on mouse over')
          console.log(e)
          console.log(e.row)
        }
      },
      {
        eventName: 'onmouseout',
        callback: (e) => {
          console.log('on mouse out')
          console.log(e)
        }
      },
      {
        eventName: 'select',
        callback: (Chart) => {
          console.log('selected', Chart.chart.getSelection())
          const selected = Chart.chart.getSelection()[0]

          if (selected) {
            this.setState({
              selected
            })
          } else {
            this.setState({
              selected: null
            })
          }
        }
      }
    ]
  }
  constructor (props) {
    super(props)

    console.log(props)

    this.state = {
      columns: chartCols (),
      rows: chartRows (props.tasks),
      selected: null,
      inside: false
    }
  }
  chartStyle () {
    console.log(this.state)
    if (this.state.selected) {
      return {
        cursor: 'move',
        display: 'inline-block'
      }
    }
  }
  render () {
    return (
      <div>
        <h3>Gantt Chart</h3>
        <div style={this.chartStyle()}>
          <Chart 
            style={this.chartStyle()}
            chartType="Gantt"
            columns={this.state.columns}
            rows={this.state.rows}
            width="600px"
            height="400px"
            options={{}}
            chartEvents={this.chartEvents()}
            />
        </div>
      </div>
    )
  }
}
