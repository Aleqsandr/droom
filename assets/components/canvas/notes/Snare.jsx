import React, { Component } from 'react';
import {Rect} from 'react-konva';

// App component - represents the whole app
export default class Snare extends Component {
  componentDidMount() {
    console.log(this.refs.note)
    this.props.startAnimation(this.refs.note);
  }

  render() {
    return (
      <Rect
          ref="note"
          width={this.props.size}
          height={this.props.size}
          x={this.props.x}
          y={-this.props.size}
          fill="black"
      />
    );
  }
}
