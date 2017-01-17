import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import App from '../App.jsx';
import MIDI from 'midi.js';
import "howler"

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

    MIDI.loadPlugin({
      soundfontUrl: "./soundfont/",
      instrument: "synth_drum",
      onsuccess:function() {
        self.setState({
          player:MIDI.Player
        })
        // MIDI.setInstrument("synth_drum");
        MIDI.setVolume(0, 0);
        self.state.player.loadFile( "./musics/1/drumDroom.midi", self.launchGame.bind(self),null,function() {console.log("nope")} );
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

    var sound = new Howl({
      src: ['./musics/1/testDroom.mp3']
    });

    setTimeout(function() {
      sound.play();
    },3000);

    this.state.player.addListener(function(data){


      // play the note
      MIDI.setVolume(0, 0);

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
