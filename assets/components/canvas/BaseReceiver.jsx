import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

// App component - represents the whole app
export default class BaseReceiver extends Component {

  checkNoteOn(note){

  }

  render() {
    return (
      <Rect
          ref="rect"
          width={this.props.size}
          height={this.props.size}
          x={this.props.x}
          fill={this.props.color}
          note={this.props.note}
      />
    );
  }
}
