import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

// App component - represents the whole app
export default class BaseReceiver extends Component {

  render() {
    let height = 50, padding = 25;
    return (
      <Rect
          ref="rect"
          width={this.props.size}
          height={this.props.size}
          x={this.props.x}
          fill={this.props.color}
      />
    );
  }
}
