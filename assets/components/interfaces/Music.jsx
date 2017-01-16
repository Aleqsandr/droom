import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import App from '../App.jsx';
import MIDI from 'midi.js';

// App component - represents the whole game window
export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finishStarter:false,
      player:null,
      data:null,
    };
  }

  componentDidMount() {
    var self = this;
    MIDI.loadPlugin(function() {
      self.setState({
        player:MIDI.Player
      })
      self.state.player.loadFile( "http://www.matthieubessol.com/soundfont/testmusic.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
    });
  }

  launchGame() {
    var self = this;
    this.setState({finishStarter:true})
  }

  finishCompteur() {
    this.setState({
      finishStarter:true
    })
  }

  handleFinishCompteur() {
    var self = this;
    this.state.player.start();
    this.state.player.addListener(function(data){
      if(data.message == 144) // NoteOn
        self.setState({data:data})
    });
  }

  render() {
    if(!this.state.finishStarter)
      return (<div className="Music-container"><div className="compteur">Loading...</div></div>);
    else
      return (<App data={this.state.data} canStart={this.handleFinishCompteur.bind(this)}/>);
  }
}
