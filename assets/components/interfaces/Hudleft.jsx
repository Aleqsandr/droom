import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import Wow from '../canvas/Wow.jsx';


// App component - represents the whole game window
export default class HudLeft extends Component {
  finishCompteur() {
    this.props.finishCompteur();
  }

  render() {
    return (
        <div className="hud hud--left">
          <div className="hud__top">
            <Compteur finish={this.finishCompteur.bind(this)}/>
          </div>
          <div className="hud__bottom">
            <Wow timingNote={this.props.timingNote}/>
          </div>
        </div>
    )
  }
}
