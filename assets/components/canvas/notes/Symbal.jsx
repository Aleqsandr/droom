import React, { Component } from 'react';
import {Circle, Group} from 'react-konva';

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

    return(
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
