import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import Score from '../canvas/Score.jsx';
import Wow from '../canvas/Wow.jsx';


// App component - represents the whole game window
export default class Hud extends Component {
  finishCompteur() {
    this.props.finishCompteur();
  }

  render() {
    return (
        <div className="hud">
          <div className="hud__top">
            <Compteur finish={this.finishCompteur.bind(this)}/>
            <Score timingNote={this.props.timingNote}/>
          </div>
          <div className="hud__bottom">
            <Wow timingNote={this.props.timingNote}/>
          </div>
        </div>
    )
  }
}
