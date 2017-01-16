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
      shouldAnim:false,
    };
  }

  componentDidMount() {
    var self = this;
    // MIDI.loadPlugin(function() {
    //   self.setState({
    //     player:MIDI.Player
    //   })
    //   self.state.player.loadFile( "http://www.matthieubessol.com/soundfont/drumdelamuerte.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
    // });

    MIDI.loadPlugin({
      soundfontUrl: "./soundfont/",
      instrument: "synth_drum",
      onsuccess:function() {
        self.setState({
          player:MIDI.Player
        })
        self.state.player.loadFile( "http://www.matthieubessol.com/soundfont/drumdelamuerte.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
      }
    })
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

      var delay = 0; // play one note every quarter second
      var velocity = 127; // how hard the note hits
      // play the note
      MIDI.setVolume(0, 127);

      if(data.message == 144){ // NoteOn
        self.setState({data:data, shouldAnim:false})
      }
    });
  }

  render() {
    if(!this.state.finishStarter)
      return (<div className="Music-container"><div className="compteur">Loading...</div></div>);
    else
      return (<App shouldAnim={this.state.shouldAnim} data={this.state.data} canStart={this.handleFinishCompteur.bind(this)}/>);
  }
}
