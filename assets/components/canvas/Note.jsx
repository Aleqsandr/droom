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
    note.to({
        y:window.innerHeight,
        duration: this.props.velocity * 2 / 120
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
    // return (
    //   <Rect
    //     ref="note"
    //     width={this.props.size}
    //     height={this.props.size}
    //     x={this.state.x}
    //     y={-this.props.size}
    //     fill="red"
    // />)

    switch(this.props.currentNote) {
      case 46 :
        return ( <Charleston hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} /> );
        break;

      case 38 :
        return ( <Snare hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 49 :
        return ( <Symbal hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 48 :
        return ( <Tom hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 36 :
        return ( <Kick hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} isKeyboard={this.props.isKeyboard} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 45 :
        return ( <Tom hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} isKeyboard={this.props.isKeyboard} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 43 :
        return ( <Tom hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 51 :
        return ( <Symbal hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      default :
        return ( <Tom hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;
    }
  }
}
