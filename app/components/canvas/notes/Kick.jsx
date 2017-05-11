import React, { Component } from 'react';
import {Rect, Group} from 'react-konva';
import utils from "../../../assets/modules/useful.js";

// App component - represents the whole app
export default class Kick extends Component {
  componentDidMount() {
    if(this.props.hasToAnim){
      this.props.startAnimation(this.refs.note);
    }
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

    if(!this.props.isKeyboard) {
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

          <Rect
              fill="black"
              width={window.innerWidth}
              height={4}
              y={this.props.size*0.5}
          />

        </Group>
      )
    }

    let datX = 0;
    if(this.props.invisible && !this.props.realKey)
      datX=-1000000;

    return (
      <Group
        width={this.props.size}
        height={this.props.size}
        x={newX}
        ref="note"
        y={newY}
        offset={{
          x:this.props.size*0.5,
          y:this.props.size*0.5
        }}
      >
        <Rect
            width={this.props.size}
            height={this.props.size}
            x={datX}
            y={0}
            fill="black" />
      </Group>
    )
  }
}
