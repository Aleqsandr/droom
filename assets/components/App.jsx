import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseDrum from './canvas/BaseDrum.jsx';
import Notes from './canvas/Notes.jsx';
import Midi from './midi/Midi.jsx';
import HudLeft from "./interfaces/Hudleft.jsx";
import HudRight from "./interfaces/Hudright.jsx";
import VanessaBar from "./canvas/VanessaBar.jsx";

// App component - represents the whole game window
export default class App extends Component {
  handler = this.handleKeyPress.bind(this)

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

      isKeyboard:false
      //scoreUpdate:null
    };
  }

  updateDimensions() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this),false);
    document.addEventListener("keydown",this.handler,false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this),false);
    document.removeEventListener("keydown",this.handler,false);
  }

  handleGroup(val) {
    this.setState({
      group:val
    });
  }

  handleKeyPress(e){
    this.setState({
      keyCode: e.keyCode,
      shouldAnim:true,
      timeKick:Date.now(),
      isKeyboard:true
    });
  }

  getNoteNumber(note){
    if (note[1]){
      this.setState({
        note : note[1],
        velocity : note[2],
        shouldAnim:true,
        timeKick:Date.now(),
        isKeyboard:false
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

  /*getScoreUpdate(val){
      console.log(val)
      if (val !== 'undefined' || val !== 'null'){
        this.setState({scoreUpdate: val});
        console.log(this.state.scoreUpdate)
      }
  }*/

  onEndMusic(score) {
    this.props.onEndMusic(score);
  }

  render() {
    return (
      <div className="container" ref="container">
        <Midi getNoteNumber={this.getNoteNumber.bind(this)}/>
        <HudLeft finishCompteur={this.finishCompteur.bind(this)} timingNote={this.state.timingNote}/>
        <main>
          <Stage width={this.state.width*0.5} height={this.state.height}>
            <BaseDrum handleGroup={this.handleGroup.bind(this)} isKeyboard={this.state.isKeyboard}/>
            <Notes
              timeKick={this.state.timeKick}
              shouldAnim={this.state.shouldAnim}
              keyCode={this.state.keyCode}
              noteIO={this.state.note}
              group={this.state.group}
              data={this.props.data}
              getTimingNoteSuccess={this.getTimingNoteSuccess.bind(this)}
              //getScoreUpdate={this.getScoreUpdate.bind(this)}
              isKeyboard={this.state.isKeyboard}
              velocity={this.props.velocity}
            />
          </Stage>
        </main>
        <HudRight timingNote={this.state.timingNote} onEndMusic={this.onEndMusic.bind(this)}/>
      </div>
    );
  }
}
