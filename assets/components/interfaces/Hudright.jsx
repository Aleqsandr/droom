import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import Score from '../canvas/Score.jsx';
import PauseMenu from './PauseMenu.jsx';
import Wow from '../canvas/Wow.jsx';
import utils from "../../modules/useful.js";

let prevTime = 0;

// App component - represents the whole game window
export default class HudRight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timingNote:null
    };
  }

  scoreUpdate(score){
    this.props.scoreUpdate(score);
  }

  handleEndMusic(score) {
    this.props.onEndMusic(score);
  }
  componentWillReceiveProps(nextProps) {
    if(prevTime && nextProps.shouldCheck){
      if(prevTime != nextProps.timingNote || nextProps.timingNote === utils.pxToTime(utils.bpmToMs(this.props.velocity),70)){
        prevTime = nextProps.timingNote;
        this.setState({
          timingNote:nextProps.timingNote
        })
      }
    } else {
      prevTime = nextProps.timingNote;
      this.setState({
          timingNote:nextProps.timingNote
        })
    }
  }

  handlePause() {
    this.props.handlePause();
  }

  render() {
    return (
        <div className="hud hud--right">
          <div className="hud__top">
            <Score
              scoreUpdate={this.scoreUpdate.bind(this)}
              timingNote={this.state.timingNote}
              onEndMusic={this.handleEndMusic.bind(this)}
              velocity={this.props.velocity}
              isPlaying={this.props.isPlaying}
            />
          </div>
          <div className="hud__bottom">
            <div className="gamemenu">
              <div className="button" onClick={this.handlePause.bind(this)}><p>PAUSE</p></div><br/>
              <div className="button"><p>SETTINGS</p></div><br/>
              <div className="button"><p>LOG OUT</p></div><br/>
            </div>
          </div>
          <PauseMenu finishPause={this.props.handlePause.bind(this)} isPlaying={this.props.isPlaying} finishStarter={this.props.finishStarter}/>
        </div>
    )
  }
}
