import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseReceiver from './BaseReceiver.jsx';

// App component - represents the whole app
export default class BaseDrum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyOne: null,
      keyTwo: null,
      keyThree: null,
      keyFour: null,
      keyFive: null,
      keySix: null,
      keySeven: null,
      keyEight: null,
      colorK: '#BDBDBD',
    };
  }

  componentDidMount() {
    this.props.handleGroup(this.refs.groupReceiver);

  }

  componentWillReceiveProps(newProps) {

    this.checkKey(newProps.keyCode);
    //this.checkRect(newProps.handleGroup);
  }

  checkKey(key){
    if(key === 83){
      this.setState({keyOne:key});
    }
    if(key === 68){
      this.setState({keyTwo:key});
    }
    if(key === 70){
      this.setState({keyThree:key});
    }
    if(key === 71){
      this.setState({keyFour:key});
    }
    if(key === 72){
      this.setState({keyFive:key});
    }
    if(key === 74){
      this.setState({keySix:key});
    }
    if(key === 75){
      this.setState({keySeven:key});
    }
    if(key === 76){
      this.setState({keyEight:key});
    }
  }

  render() {
    let size = 50, padding = 25, y = window.innerHeight - size - padding;
    return (
      <Layer>
        <Group ref="groupReceiver" y={window.innerHeight - size - padding} x={0}>
          <BaseReceiver x={0} size={size} color="#BDBDBD" note={46} keyCode={this.state.keyOne} />
          <BaseReceiver x={size*1+padding} size={size} color="#9CCC65" note={49} keyCode={this.state.keyTwo} />
          <BaseReceiver x={size*2+padding*2} size={size} color="#FFCA28" note={38} keyCode={this.state.keyThre} />
          <BaseReceiver x={size*3+padding*3} size={size} color="#FF7043" note={48} keyCode={this.state.keyFour} />
          <BaseReceiver x={size*4+padding*4} size={size} color="#26A69A" note={36} keyCode={this.state.keyFive} />
          <BaseReceiver x={size*5+padding*5} size={size} color="#5C6BC0" note={45} keyCode={this.state.keySix} />
          <BaseReceiver x={size*6+padding*6} size={size} color="#ef5350" note={43} keyCode={this.state.keySeven} />
          <BaseReceiver x={size*7+padding*7} size={size} color="#AB47BC" note={51} keyCode={this.state.keyEight} />
        </Group>
      </Layer>
    );
  }
}
