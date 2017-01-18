import React, { Component } from 'react';

export default class EndMusic extends Component {

  render() {
    return (
        <div className="end">
          <div className="end__title">{this.props.score}</div>
        </div>
    )
  }
}
