import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

// App component - represents the whole app
export default class BaseReceiver extends Component {

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    let note = this.refs.note;
    
    // to() is a method of `Konva.Node` instances
    note.to({
        y:window.innerHeight,
        duration: 10
    });
  }

  componentWillReceiveProps(nextProps) {
    this.checkCollision(nextProps.group);
  }

  checkCollision(group) {
    let pas = 10;
    let y = this.refs.note.getY(), x = this.refs.note.getX();
    let posX = group.getChildren()[0].x(), posY = group.y() + group.getChildren()[0].y();

    // CheckY()
    console.log(y+this.props.size)
    console.log(posY-pas)
    if(y+this.props.size >= posY-pas && y+this.props.size <= posY+pas+this.props.size) {
      console.log("ok y")
    }

    // if()
  }

  render() {
    return (
      <Rect
          ref="note"
          width={this.props.size}
          height={this.props.size}
          x={this.props.x}
          fill={this.props.color}
      />
    );
  }
}
