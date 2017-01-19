import React, { Component } from 'react';
import {Circle} from 'react-konva';

// App component - represents the whole app
export default class Charleston extends Component {

  componentDidMount() {
    console.log(this.refs.note)
    this.props.startAnimation(this.refs.note);
  }

  render() {
    return (
      <Circle
          ref="note"
          width={this.props.size}
          height={this.props.size}
          radius={this.props.size}
          x={this.props.x}
          y={-this.props.size}
          fill="white"
          stroke="black"
          strokeWidth="4"
      />
    );
  }
}
