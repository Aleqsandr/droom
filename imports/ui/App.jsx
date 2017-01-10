import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseDrum from './components/BaseDrum.jsx';
import Notes from './components/Notes.jsx';
import Midi from '../midi/Midi.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyCode:null,
      group:null,
      note:null,
      velocity:null
    };
  }

  componentDidMount() {
    document.addEventListener("keydown",this.handleKey.bind(this));
  }

  handleKey(e) {
    this.setState({
      keyCode:e.keyCode
    });
  }

  handleGroup(val) {
    this.setState({
      group:val
    });
  }

  getNoteNumber(note){
    if (note[1] == 38){
      this.setState({note : note[1], velocity : note[2]});
    }
  }

  render() {
    return (
      <div className="container">
        <Midi getNoteNumber={this.getNoteNumber.bind(this)}/>
        <main>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <BaseDrum handleGroup={this.handleGroup.bind(this)}/>
            <Notes noteIO={this.state.note} keyCode={this.state.keyCode} group={this.state.group}/>
          </Stage>
        </main>
      </div>
    );
  }
}
