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
        <Group ref="groupReceiver" y={window.innerHeight - size - padding} x={window.innerWidth / 3}>
          <BaseReceiver x={0} size={size} color="#BDBDBD" note={46}/>
          <BaseReceiver x={size*1+padding} size={size} color="#9CCC65" note={49}/>
          <BaseReceiver x={size*2+padding*2} size={size} color="#FFCA28" note={38}/>
          <BaseReceiver x={size*3+padding*3} size={size} color="#FF7043" note={48}/>
          <BaseReceiver x={size*4+padding*4} size={size} color="#26A69A" note={36}/>
          <BaseReceiver x={size*5+padding*5} size={size} color="#5C6BC0" note={45}/>
          <BaseReceiver x={size*6+padding*6} size={size} color="#ef5350" note={43}/>
          <BaseReceiver x={size*7+padding*7} size={size} color="#AB47BC" note={51}/>
        </Group>
      </Layer>
    );
  }
}
