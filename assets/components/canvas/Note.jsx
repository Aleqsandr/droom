import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

// App component - represents the whole app
export default class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      group:this.props.group,
      x:0
    };
  }

  componentDidMount() {
    this.startAnimation();
    this.getCorrectGroup();
  }

  startAnimation() {
    let note = this.refs.note;
    note.to({
        y:window.innerHeight,
        duration: this.props.timeToFall
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      group:nextProps.group
    });
    this.checkCollision(nextProps);
  }

  getCorrectGroup() {
    for (var i = this.state.group.getChildren().length - 1; i >= 0; i--) {
      if(this.state.group.getChildren()[i].getAttr("note") === this.props.currentNote) {
        this.setState({
          x:this.state.group.getChildren()[i].x()
        })
      }
    }
  }

  render() {
    let sizeX = this.props.size,
        sizeY = this.props.size,
        x = this.state.x,
        y = -this.props.size;

    if(this.props.isKick) {
      x = 0;
      y = -4;
      sizeX = window.innerWidth*0.5;
      sizeY = 4;
    }
    return (
      <Rect
          ref="note"
          width={sizeX}
          height={sizeY}
          x={x}
          y={y}
          fill={this.props.color}
      />
    );
  }
}
