import React, { Component } from 'react';
import {Layer, Rect, Stage, Group, Text} from 'react-konva';

// App component - represents the whole app
export default class BaseReceiver extends Component {

  render() {
    return (
      <Group width={this.props.size} height={this.props.size} x={this.props.x + 25} note={this.props.note} keyCode={this.props.keyCode}>
        <Rect
            ref="rect"
            width={this.props.size}
            height={this.props.size}
            x={0}
            offset= {{
                        x: 25,
                        y: 25}}
            fill={this.props.color}
        />

        <Text
          text={this.props.letter}
          fontSize={30}
          x={this.props.size/2 - 5}
          y={this.props.size/2 - 30/2}
          offset= {{
                        x: 25,
                        y: 25}}
          fontFamily="Calibri"
          fill="white" />
      </Group>
    );
  }
}
