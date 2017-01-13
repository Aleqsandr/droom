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
    console.log("note receive new props")
    this.setState({
      group:nextProps.group
    });
    this.checkCollision(nextProps);
  }

  test() {
    console.log("okiiiii");
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

  checkCollision(nextProps) {
    // console.log("check collision");
    // let pas = 10;
    // let y = this.refs.note.getY(), x = this.refs.note.getX();
    // let posX = nextProps.group.getChildren()[0].x(), posY = group.y() + nextProps.group.getChildren()[0].y();

    // // CheckY()
    // // console.log(y+this.props.size)
    // // console.log(posY-pas)
    // if(y+nextProps.size >= posY-pas && y+nextProps.size <= posY+pas+nextProps.size) {

    //   if(nextProps.noteIO == nextProps.group.getChildren()[0].getAttr("note")){
    //     this.refs.note.destroy();

    //     nextProps.group.getChildren()[0].to({scaleX:1.9, scaleY:1.2, duration: 0});
    //     nextProps.group.getChildren()[0].to({scaleX:1, scaleY:1, duration: 0.9});
    //   }

    /*
    3 --> height
    ? --> 0.25
    */

    // }
  }

  render() {
    //console.log("wowowowow render")
    return (
      <Rect
          ref="note"
          width={this.props.size}
          height={this.props.size}
          x={this.state.x}
          y={-this.props.size}
          fill={this.props.color}
      />
    );
  }
}
