import React, { Component } from 'react';
import {Circle} from 'react-konva';

// App component - represents the whole app
export default class Charleston extends Component {

  componentDidMount() {
    if(this.props.hasToAnim)
      this.props.startAnimation(this.refs.note);
  }

  render() {
    let widthStroke = 4,
        y = 0;

    if(this.props.y){
      console.log("y a un Y : " + this.props.y)
      y = this.props.y
    }
    return (
      <Circle
          ref="note"
          width={this.props.size - widthStroke*0.5}
          height={this.props.size - widthStroke*0.5}
          x={this.props.x + 25 + widthStroke*0.5}
          y={-this.props.size + y}
          offset={{
            x:this.props.size*0.5,
            y:this.props.size*0.5
          }}
          fill="white"
          stroke="black"
          strokeWidth={widthStroke}
      />
    );
  }
}
