import React, { Component } from 'react'

console.log('neat')

import D3GanttChart from '../components/D3GanttChart.jsx'
import SaveButton from '../components/SaveButton.jsx'

import { saveGanttChart } from '../api'

import {
  toDate,
  parseTasks
} from '../helpers'

const ganttStyle = {
  marginTop: '25px'
}

export default class GanttChart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dirty: false,
      saving: false,
      tasks: this.props.tasks,
      errorMessage: null
    }
  }
  onChange (tasks) {
    console.log(tasks)
    this.setState({ dirty: true, tasks })
  }
  onSave () {
    this.setState({ saving: true })

    saveGanttChart(this.state.tasks)
      .then(() => {
        this.setState({ saving: false, dirty: false })
      })
      .catch((err) => {
        alert(err)
        this.setState({ errorMessage: err.message })
      })
  }
  render () {
    return (
      <div>
        <div className='row text-center' style={ganttStyle}>
          <div className='col'>
            <SaveButton 
              disabled={! this.state.dirty} 
              saving={this.state.saving}
              onClick={this.onSave.bind(this)} />
          </div>
        </div>

        <D3GanttChart 
          onChange={this.onChange.bind(this)}
          tasks={parseTasks(this.props.tasks)} 
          start={toDate(this.props.start)} 
          end={toDate(this.props.end)} />
      </div>
    )
  }
}
