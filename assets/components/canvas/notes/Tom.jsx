import React, { Component } from 'react';
import {Rect,Group} from 'react-konva';

// App component - represents the whole app
export default class Tom extends Component {
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
        <Rect
            fill="#000000"
            width={this.props.size*0.66}
            height={this.props.size*0.66}
            y={17}
            x={17}
        />
      </Group>
    );
  }
}
