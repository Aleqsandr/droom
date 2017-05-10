import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import Score from '../canvas/Score.jsx';
import PauseMenu from './PauseMenu.jsx';
import Wow from '../canvas/Wow.jsx';
import utils from "../../assets/modules/useful.js";
import {Link} from "react-router";

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
    if(!this.props.isPractice)
      this.props.onEndMusic(score);
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.shouldCheck) return;
    if(prevTime){
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
    if(!this.props.isLive && !this.props.isPractice) {
      return (
          <div className="hud hud--right">
            <div className="hud__top">
            </div>
            <div className="hud__bottom">
              <div className="gamemenu">
                <div className="button" onClick={this.handlePause.bind(this)}><p>PAUSE</p></div><br/>
                <Link to="/menu" className="button"><p>MENU</p></Link><br/>
              </div>
            </div>
            <PauseMenu finishPause={this.props.handlePause.bind(this)} isPlaying={this.props.isPlaying} finishStarter={this.props.finishStarter}/>
          </div>
      )
    }

    return (
        <div className="hud hud--right">
          <div className="hud__top">
            <Score
              scoreUpdate={this.scoreUpdate.bind(this)}
              timingNote={this.state.timingNote}
              onEndMusic={this.handleEndMusic.bind(this)}
              velocity={this.props.velocity}
              isPlaying={this.props.isPlaying}
              shouldCheck={this.props.shouldCheck}
              isPractice={this.props.isPractice}
            />
          </div>
          <div className="hud__bottom">
            <div className="gamemenu">
              <div className="button" onClick={this.handlePause.bind(this)}><p>PAUSE</p></div><br/>
              <Link to="/menu" className="button"><p>MENU</p></Link><br/>
            </div>
          </div>
          <PauseMenu finishPause={this.props.handlePause.bind(this)} isPlaying={this.props.isPlaying} finishStarter={this.props.finishStarter}/>
        </div>
    )
  }
}
