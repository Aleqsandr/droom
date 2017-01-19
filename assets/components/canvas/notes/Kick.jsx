import React, { Component } from 'react';
import {Rect, Group} from 'react-konva';

// App component - represents the whole app
export default class Kick extends Component {
  componentDidMount() {
    this.props.startAnimation(this.refs.note);
  }

  render() {
    if(!this.props.isKeyboard) {
      return(
        <Group
          width={window.innerWidth}
          height={this.props.size}
          x={this.props.x}
          ref="note"
          y={-this.props.size}>
          <Rect
              fill="black"
              width={window.innerWidth}
              height={4}
              y={this.props.size*0.5}
          />
        </Group>
      )
    }

    return (
      <Rect
          ref="note"
          width={this.props.size}
          height={this.props.size}
          x={this.state.x}
          y={-this.props.size}
          fill={this.props.color}
      />
    );
  }
}
