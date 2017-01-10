import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

// App component - represents the whole app
export default class Note extends Component {

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    let note = this.refs.note;

    // to() is a method of `Konva.Node` instances
    setTimeout(function() {
      note.to({
          y:window.innerHeight,
          duration: 5
      });
    },this.props.timeout)
  }

  componentWillReceiveProps(nextProps) {
    this.checkCollision(nextProps.group,nextProps);
  }

  checkCollision(group,nextProps) {
    let pas = 10;
    let y = this.refs.note.getY(), x = this.refs.note.getX();
    let posX = group.getChildren()[0].x(), posY = group.y() + group.getChildren()[0].y();

    // CheckY()
    // console.log(y+this.props.size)
    // console.log(posY-pas)
    if(y+nextProps.size >= posY-pas && y+nextProps.size <= posY+pas+nextProps.size) {

      if(nextProps.noteIO == group.getChildren()[0].getAttr("note")){
        console.log(nextProps.noteIO)
        this.refs.note.destroy();

        group.getChildren()[0].to({scaleX:1.9, scaleY:1.2, duration: 0});
        group.getChildren()[0].to({scaleX:1, scaleY:1, duration: 0.9});
      }

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
