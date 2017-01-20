import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseReceiver from './BaseReceiver.jsx';

// App component - represents the whole app
export default class BaseDrum extends Component {

  componentDidMount() {
    this.props.handleGroup(this.refs.groupReceiver);
  }

  render() {
    let size = 50, padding = 25, y = window.innerHeight - size - padding, diff = 0;
    if(!this.props.isKeyboard) {
      diff = -1;
    }
    return (
      <Layer>
        <Group ref="groupReceiver" y={window.innerHeight - size} x={0}>
          <BaseReceiver letter="s" x={0} size={size} color="#BDBDBD" note={46} />
          <BaseReceiver letter="d" x={size*1+padding} size={size} color="#9CCC65" note={49} />
          <BaseReceiver letter="f" x={size*2+padding*2} size={size} color="#FFCA28" note={38} />
          <BaseReceiver letter="g" x={size*3+padding*3} size={size} color="#FF7043" note={48} />
          <BaseReceiver letter="h" x={size*4+padding*4 + size*10*diff} size={size} color="#26A69A" note={36} />
          <BaseReceiver letter="j" x={size*(5+diff)+padding*(5+diff)} size={size} color="#5C6BC0" note={45} />
          <BaseReceiver letter="k" x={size*(6+diff)+padding*(6+diff)} size={size} color="#ef5350" note={43} />
          <BaseReceiver letter="l" x={size*(7+diff)+padding*(7+diff)} size={size} color="#AB47BC" note={51} />
        </Group>
      </Layer>
    );
  }
}
