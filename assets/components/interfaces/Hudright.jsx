import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import Score from '../canvas/Score.jsx';
import Wow from '../canvas/Wow.jsx';


// App component - represents the whole game window
export default class HudRight extends Component {
  scoreUpdate(){
    this.props.scoreUpdate();
  }

  handleEndMusic(score) {
    this.props.onEndMusic(score);
  }

  render() {
    return (
        <div className="hud hud--right">
          <div className="hud__top">
            <Score
              scoreUpdate={this.scoreUpdate.bind(this)}
              timingNote={this.props.timingNote}
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
