import React, { Component } from 'react'

export default class Loader extends Component {
  render() {
    return (
      <div>
          <div className="full tc">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
      </div>
    )
  }
}
