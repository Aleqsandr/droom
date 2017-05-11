import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import Wow from '../canvas/Wow.jsx';
import Star from '../canvas/Star.jsx';


// App component - represents the whole game window
export default class HudLeft extends Component {
  finishCompteur() {
    this.props.finishCompteur();
  }

  render() {
    let stars = [];
    for (var i = 0; i < this.props.track.difficulty; i++) {
        stars.push(<Star key={i}/>)
    }
    return (
        <div className="hud hud--left">
          <div className="hud__top">
            <Compteur finish={this.finishCompteur.bind(this)}/>
            <div className="hud__music">
              <div className="tracktitle">{this.props.track.name}</div>
              {!this.props.isPractice ? (
                <div>
                  <div className="trackartist">{this.props.track.artist}</div>
                  <div className="trackyear">{this.props.track.year} &#8212; {stars}</div>
                </div>
              ) : (
                <div className="trackyear">{stars}</div>
              )}
            </div>
          </div>
          <div className="hud__bottom">
            <Wow timingNote={this.props.timingNote} isPlaying={this.props.isPlaying} shouldCheck={this.props.shouldCheck}/>
          </div>
        </div>
    )
  }
}
