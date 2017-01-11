import React, { Component } from 'react'

export default class SaveButton extends Component {
  renderButtonText () {
    if (this.props.saving) {
      return 'Saving...'
    } else {
      return  'Save'
    }
  }
  render () {
    return (
      <button 
        onClick={this.props.onClick} 
        disabled={this.props.disabled} 
        className='btn btn-primary'>
          {this.renderButtonText()}
        </button>
    )
  }
}
