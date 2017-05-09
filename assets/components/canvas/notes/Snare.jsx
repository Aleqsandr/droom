import React, { Component } from 'react';
import {Rect, Group} from 'react-konva';
import utils from "../../../modules/useful.js";

// App component - represents the whole app
export default class Snare extends Component {
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
              fill="black"
              width={this.props.size}
              height={this.props.size}
              y={0}
          />
        </Group>
      )
  }
}
