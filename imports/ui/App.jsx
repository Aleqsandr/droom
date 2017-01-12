import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseDrum from './components/BaseDrum.jsx';
import Notes from './components/Notes.jsx';
import Midi from '../midi/Midi.jsx';

// App component - represents the whole game window
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width:null,
      height:null,
      keyCode:null,
      group:null,
      note:null,
      velocity:null
    };
  }

  updateDimensions() {
      this.setState({width: window.innerWidth, height: window.innerHeight});
  }
  componentWillMount() {
      this.updateDimensions();
  }
  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions.bind(this));
      document.addEventListener("keydown",this.handleKeyPress.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  handleGroup(val) {
    this.setState({
      group:val
    });
  }

  handleKeyPress(e){
    console.log(e)
    this.setState({keyCode: e.keyCode});
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
          <Stage width={this.state.width} height={this.state.height}>
          <BaseDrum keyCode={this.state.keyCode} handleGroup={this.handleGroup.bind(this)} />
            <Notes noteIO={this.state.note}  group={this.state.group} keyCode={this.state.keyCode}/>
          </Stage>
        </main>
      </div>
    );
  }
}
