import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseDrum from './canvas/BaseDrum.jsx';
import Notes from './canvas/Notes.jsx';
import Compteur from './canvas/Compteur.jsx';
import Midi from './midi/Midi.jsx';

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
      velocity:null,
      finishStarter:false,
      shouldAnim:false,
      timeKick:null,
      timingNote:0,
    };
  }

  updateDimensions() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
  }

  componentWillMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
      document.addEventListener("keydown",this.handleKeyPress.bind(this));
  }

  componentDidMount() {
    //test
    /*document.getElementsByTagName("canvas")[0].getContext("2d",
                 { antialias: false,
                   depth: false });*/
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
      document.removeEventListener("keydown",this.handleKeyPress.bind(this));
  }

  handleGroup(val) {
    this.setState({
      group:val
    });
  }

  handleKeyPress(e){
    this.setState({keyCode: e.keyCode, shouldAnim:true,timeKick:Date.now()});
  }

  getNoteNumber(note){
    if (note[1]){
      this.setState({
        note : note[1],
        velocity : note[2],
        shouldAnim:true,
        timeKick:Date.now()
      });
    }
  }

  finishCompteur() {
    this.props.canStart();
    this.setState({
      finishStarter:true
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({shouldAnim:nextProps.shouldAnim})
  }

  getTimingNoteSuccess(val) {
    this.setState({
      timingNote:val
    })
  }

  render() {
    return (
      <div className="container">
        <Compteur finish={this.finishCompteur.bind(this)}/>
        <Midi getNoteNumber={this.getNoteNumber.bind(this)}/>
        <main>
          <Stage width={this.state.width*0.5} height={this.state.height}>
            <BaseDrum handleGroup={this.handleGroup.bind(this)} />
            <Notes timeKick={this.state.timeKick} shouldAnim={this.state.shouldAnim} keyCode={this.state.keyCode} noteIO={this.state.note} group={this.state.group} data={this.props.data} getTimingNoteSuccess={this.getTimingNoteSuccess.bind(this)}/>
          </Stage>
        </main>
      </div>
    );
  }
}
