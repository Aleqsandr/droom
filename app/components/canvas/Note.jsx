import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

import Charleston from './notes/Charleston.jsx';
import Kick from './notes/Kick.jsx';
import Snare from './notes/Snare.jsx';
import Symbal from './notes/Symbal.jsx';
import Tom from './notes/Tom.jsx';
import utils from '../../assets/modules/useful.js'

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
    if(!this.props.isFreemode) {
      let self = this;
      note.to({
          y:window.innerHeight,
          duration: this.props.velocity * 2 / 120,
          onFinish: function() {
              self.checkFailure(note.getChildren());
          }
      });
    } else {
      console.log("no freemode")
      let self = this;

      note.to({
        scaleX: 0.5,
        scaleY: 0.5,
        duration: 0
      });

      setTimeout(() => {
        note.to({
          scaleX: 1.3,
          scaleY: 1.3,
          duration: 0.1
        });
      }, 5);

      setTimeout(() => {
        note.to({
          scaleX: 0,
          scaleY: 0,
          duration: 0.1
        });
      }, 105);
    }
  }

  checkFailure(note) {
    if(note.length){
      this.props.failNote(utils.pxToTime(utils.bpmToMs(this.props.velocity),70));
    }
  }

  getCorrectGroup() {
    if(!this.props.isFreemode) {
      for (var i = this.state.group.getChildren().length - 1; i >= 0; i--) {
        if(this.state.group.getChildren()[i].getAttr("note") === this.props.currentNote) {
          this.setState({
            x:this.state.group.getChildren()[i].x()
          })
        }
      }
    }
  }

  render() {

    switch(this.props.currentNote) {
      case 46 :
        return ( <Charleston isFreemode={this.props.isFreemode} hasToAnim={this.props.hasToAnim} startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} /> );
        break;

      case 38 :
        return ( <Snare hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 49 :
        return ( <Symbal hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 48 :
        return ( <Tom hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 36 :
        return ( <Kick hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} isKeyboard={this.props.isKeyboard} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 45 :
        return ( <Tom hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} isKeyboard={this.props.isKeyboard} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 43 :
        return ( <Tom hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      case 51 :
        return ( <Symbal hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;

      default :
        return ( <Tom hasToAnim={this.props.hasToAnim} isFreemode={this.props.isFreemode}  startAnimation={this.startAnimation.bind(this)} x={this.state.x+this.props.size*0.5} y={-this.props.size*0.5} size={this.props.size} />);
        break;
    }
  }
}
