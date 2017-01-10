import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseReceiver from './BaseReceiver.jsx';

// App component - represents the whole app
export default class BaseDrum extends Component {
  componentDidMount() {
    this.props.handleGroup(this.refs.groupReceiver);
  }

  render() {
    let size = 50, padding = 25, y = window.innerHeight - size - padding;
    return (
      <Layer>
        <Group ref="groupReceiver" y={window.innerHeight - size - padding} x={ (window.innerWidth) / 2 }>
          <BaseReceiver x={0} size={size} color="#ff0000"/>
          <BaseReceiver x={size*1+padding} size={size} color="#00ff00"/>
          <BaseReceiver x={size*2+padding*2} size={size} color="#fff000"/>
          <BaseReceiver x={size*3+padding*3} size={size} color="#ff00ff"/>
        </Group>
      </Layer>
    );
  }
}
