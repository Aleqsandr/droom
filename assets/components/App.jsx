import React, { Component } from 'react';
import {Link} from "react-router"
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseDrum from './canvas/BaseDrum.jsx';
import Notes from './canvas/Notes.jsx';
import Midi from './midi/Midi.jsx';
import FreeNote from './canvas/FreeNote.jsx';
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
      isKeyboard:true,
    });
  }

  getNoteNumber(note){
    if (note[1]){
      this.setState({
        note : note[1],
        velocity : note[2],
        shouldAnim:true,
        timeKick:Date.now(),
        isKeyboard:false,
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
    if(!nextProps.isPlaying)
      this.setState({timeKick:null,keyCode:null})
  }

  getTimingNoteSuccess(val) {
    if(this.props.isFreemode)return
    if(!this.props.shouldCheck)return;
    this.setState({
      timingNote:val,
      shouldAnim:true
    })
  }

  onEndMusic(score) {
    this.props.onEndMusic(score);
  }

  onPauseMusic() {
    this.props.onPauseMusic();
  }

  scoreUpdate(score) {
    this.props.getScore(score);
  }

  render() {
    return (
      <div className="container" ref="container">
        <Midi getNoteNumber={this.getNoteNumber.bind(this)}/>
        {!this.props.isFreemode ? (
          <HudLeft
            track={this.props.track}
            isPractice={this.props.isPractice}
            finishCompteur={this.finishCompteur.bind(this)}
            timingNote={this.state.timingNote}
            isPlaying={this.props.isPlaying}
            shouldCheck={this.props.shouldCheck}/>
        ) : (<div/>)}
        {!this.props.isFreemode ? (
          <main>
            <Stage width={this.state.width*0.5} height={this.state.height}>
              <BaseDrum handleGroup={this.handleGroup.bind(this)} isKeyboard={this.state.isKeyboard}/>
              <Notes
                timeKick={this.state.timeKick}
                shouldAnim={this.state.shouldAnim}
                keyCode={this.state.keyCode}
                noteIO={this.state.note}
                group={this.state.group}
                timingNote={this.state.timingNote}
                data={this.props.data}
                isPlaying={this.props.isPlaying}
                getTimingNoteSuccess={this.getTimingNoteSuccess.bind(this)}
                //getScoreUpdate={this.getScoreUpdate.bind(this)}
                isKeyboard={this.state.isKeyboard}
                velocity={this.props.velocity}
                shouldCheck={this.props.shouldCheck}
              />
            </Stage>
          </main>
          ) : (
            <main>
              <Stage width={this.state.width} height={this.state.height}>
                <FreeNote
                  noteIO={this.state.note}
                  keyCode={this.state.keyCode}
                  data={this.props.data}
                  isKeyboard={this.state.isKeyboard}
                  velocity={50}
                />
              </Stage>
            </main>
          )}
        {!this.props.isFreemode ? (
          <HudRight
            velocity={this.props.velocity}
            timingNote={this.state.timingNote}
            onEndMusic={this.onEndMusic.bind(this)}
            handlePause={this.onPauseMusic.bind(this)}
            isPlaying={this.props.isPlaying}
            finishStarter={this.state.finishStarter}
            scoreUpdate={this.scoreUpdate.bind(this)}
            shouldCheck={this.props.shouldCheck}
            isLive={this.props.isLive}
            isPractice={this.props.isPractice}
          />
        ) : (
          <div className="hud hud--right hud--freemode">
            <div className="hud__bottom">
              <div className="gamemenu">
                <Link to="/menu" className="button"><p>MENU</p></Link><br/>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
