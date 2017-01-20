import React, { Component } from 'react';
import {Rect} from 'react-konva';

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
    return (
      <Rect
          ref="note"
          width={this.props.size}
          height={this.props.size}
          x={this.props.x}
          y={-this.props.size + y}
          offset={{
            x:this.props.size*0.5,
            y:this.props.size*0.5
          }}
          fill="black"
      />
    );
  }
}
