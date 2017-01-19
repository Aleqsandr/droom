import React, { Component } from 'react';
import {Circle, Group} from 'react-konva';

// App component - represents the whole app
export default class Symbal extends Component {
    componentDidMount() {
        console.log(this.refs.note)
        this.props.startAnimation(this.refs.note);
    }

  render() {
    return (
      <Group
        width={this.props.size}
        height={this.props.size}
        x={this.props.x}
        ref="note"
        y={-this.props.size}>
        <Circle
            fill="black"
            width={this.props.size}
            height={this.props.size}
        />
        <Circle
            fill="black"
            stroke='white'
            strokeWidth = {4}
            width={this.props.size*0.66}
            height={this.props.size*0.66}
            x={0}
            y={0}
        />
      </Group>
    );
  }
}
