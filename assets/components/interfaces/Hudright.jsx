import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import Score from '../canvas/Score.jsx';
import Wow from '../canvas/Wow.jsx';

let prevTime = 0;


// App component - represents the whole game window
export default class HudRight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timingNote:null
    };
  }
  scoreUpdate(){
    this.props.scoreUpdate();
  }

  handleEndMusic(score) {
    this.props.onEndMusic(score);
  }
  componentWillReceiveProps(nextProps) {
    if(prevTime){
      if(prevTime != nextProps.timingNote){
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

  render() {
    return (
        <div className="hud hud--right">
          <div className="hud__top">
            <Score
              scoreUpdate={this.scoreUpdate.bind(this)}
              timingNote={this.state.timingNote}
              onEndMusic={this.handleEndMusic.bind(this)}
              velocity={this.props.velocity}
            />
          </div>
          <div className="hud__bottom">
            <div className="gamemenu">
              <a href="#"><div className="button"><p>PAUSE</p></div></a><br/>
              <a href="#"><div className="button"><p>SETTINGS</p></div></a><br/>
              <a href="#"><div className="button"><p>LOG OUT</p></div></a><br/>
            </div>
          </div>
        </div>
    )
  }
}
