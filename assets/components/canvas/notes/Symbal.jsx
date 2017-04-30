import React, { Component } from 'react';
import {Circle, Group} from 'react-konva';
import utils from "../../../modules/useful.js";

// App component - represents the whole app
export default class Symbal extends Component {
    componentDidMount() {
        if(this.props.hasToAnim)
            this.props.startAnimation(this.refs.note);
    }

  render() {
    let y = 0;
    if(this.props.y)
        y = this.props.y;

    let newY=-this.props.size, newX = this.props.x;
    if(this.props.isFreemode){
      let rndY = utils.randBetween(-350, 350);
      let rndX = utils.randBetween(-350, 350);
      newY=rndY + window.innerHeight*0.5 + this.props.size + this.props.size*0.5
      newX=rndX + window.innerWidth*0.5 + this.props.size + this.props.size*0.5
    }

    return(
        <Group
          width={window.innerWidth}
          height={this.props.size}
          x={newX}
          ref="note"
          y={newY}
          offset={{
            x:this.props.size*0.5,
            y:this.props.size*0.5
          }}
        >

          <Circle
            fill="black"
            width={this.props.size}
            height={this.props.size}
            x={0}
            y={0}
            offset={{
              x:-this.props.size*0.5,
              y:-this.props.size*0.5
            }}
          />
          <Circle
            fill="black"
            stroke='white'
            strokeWidth = {4}
            width={this.props.size*0.66}
            height={this.props.size*0.66}
            x={0}
            y={0}
            offset={{
              x:-this.props.size*0.5,
              y:-this.props.size*0.5
            }}
          />

        </Group>
    );

    return (
      <Group
        width={this.props.size}
        height={this.props.size}
        x={this.props.x + 25}
        ref="note"
        y={-this.props.size + y}
        offset={{
          x:this.props.size*0.5,
          y:this.props.size*0.5
        }}
        >
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
