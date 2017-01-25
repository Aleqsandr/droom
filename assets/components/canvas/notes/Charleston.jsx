import React, { Component } from 'react';
import {Circle,Rect, Group} from 'react-konva';

// App component - represents the whole app
export default class Charleston extends Component {

  componentDidMount() {
    if(this.props.hasToAnim){
      this.props.startAnimation(this.refs.note);
    }
  }

  render() {
    let widthStroke = 4,
        y = 0;


    return (
      <Group
        width={window.innerWidth}
        height={this.props.size}
        x={this.props.x}
        ref="note"
        y={-this.props.size}
        offset={{
          x:this.props.size*0.5,
          y:this.props.size*0.5
        }}
      >
        <Circle
            width={this.props.size - widthStroke*0.5}
            height={this.props.size - widthStroke*0.5}
            offset={{
              x:-this.props.size*0.5,
              y:-this.props.size*0.5
            }}
            fill="white"
            stroke="black"
            strokeWidth={widthStroke}
        />
      </Group>
    );

    if(this.props.y){
      console.log("y a un Y : " + this.props.y)
      y = this.props.y
    }
    return (
      <Group
        width={window.innerWidth}
        height={this.props.size}
        x={this.props.x}
        ref="note"
        y={-this.props.size}
        offset={{
          x:this.props.size*0.5,
          y:this.props.size*0.5
        }}
      >
        <Circle
            width={this.props.size - widthStroke*0.5}
            height={this.props.size - widthStroke*0.5}
            offset={{
              x:-this.props.size*0.5,
              y:-this.props.size*0.5
            }}
            fill="white"
            stroke="black"
            strokeWidth={widthStroke}
        />
      </Group>
    );
  }
}
