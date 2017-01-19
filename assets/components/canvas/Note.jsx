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
        duration: this.props.velocity / 60
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
    if(this.props.isKick && !this.props.isKeyboard) {
      return(
        <Group
          width={window.innerWidth}
          height={this.props.size}
          x={this.state.x}
          ref="note"
          y={-this.props.size}>
          <Rect
              fill={this.props.color}
              width={window.innerWidth}
              height={4}
              y={this.props.size*0.5}
          />
        </Group>
      )
    }

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
