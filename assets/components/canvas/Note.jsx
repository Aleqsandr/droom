import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

import Charleston from './notes/Charleston.jsx';
import Kick from './notes/Kick.jsx';
import Snare from './notes/Snare.jsx';
import Symbal from './notes/Symbal.jsx';
import Tom from './notes/Tom.jsx';

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
    this.getCorrectGroup();
  }

  startAnimation(note) {
    console.log(note);
    note.to({
        y:window.innerHeight,
        duration: this.props.timeToFall
    });
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
    console.log(this.props.currentNote)
    switch(this.props.currentNote) {
      case 46 :
        return ( <Charleston startAnimation={this.startAnimation.bind(this)} x={this.state.x} y={-this.props.size} size={this.props.size} /> );
        break;

      case 49 :
        return ( <Snare startAnimation={this.startAnimation.bind(this)} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;

      case 38 :
        return ( <Symbal startAnimation={this.startAnimation.bind(this)} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;

      case 48 :
        return ( <Tom startAnimation={this.startAnimation.bind(this)} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;

      case 36 :
        return ( <Kick startAnimation={this.startAnimation.bind(this)} isKeyboard={this.props.isKeyboard} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;

      case 45 :
        return ( <Tom startAnimation={this.startAnimation.bind(this)} isKeyboard={this.props.isKeyboard} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;

      case 43 :
        return ( <Tom startAnimation={this.startAnimation.bind(this)} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;

      case 51 :
        return ( <Symbal startAnimation={this.startAnimation.bind(this)} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;

      default :
        return ( <Tom startAnimation={this.startAnimation.bind(this)} x={this.state.x} y={-this.props.size} size={this.props.size} />);
        break;
    }
  }
}
