import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import App from '../App.jsx';
import MIDI from 'midi.js';
import "howler";
import utils from "../../modules/useful.js";
import EndMusic from '../interfaces/EndMusic.jsx';

// App component - represents the whole game window
export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finishStarter:false,
      player:null,
      data:null,
      shouldAnim:false,
      score:null,
      isFinish:false
    };
  }

  componentDidMount() {
    var self = this;

    MIDI.loadPlugin({
      soundfontUrl: "./soundfont/",
      instrument: "synth_drum",
      onsuccess:function() {
        console.log(MIDI)
        self.setState({
          player:MIDI.Player
        })
        MIDI.programChange(0, 118);
        MIDI.setVolume(0, 0);
        self.state.player.loadFile( "./musics/2/drumDroom2.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
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

  onEndMusic(score) {
    this.setState({
      score:score,
      isFinish:true
    })
  }

  handleFinishCompteur() {
    var self = this;
    this.state.player.start();

    var sound = new Howl({
      src: ['./musics/2/testDroom2.mp3']
    });

    setTimeout(function() {
      sound.play();
    },3000 - utils.pxToTime(50));

    this.state.player.BPM = 100;
    this.state.player.addListener(function(data){
      // play the note
      console.log(data)
      MIDI.setVolume(0, 0);

      if(data.message == 144){ // NoteOn
        self.setState({data:data, shouldAnim:false})
      }
    });
  }

  render() {
    if(this.state.isFinish)
      return <EndMusic score={this.state.score}/>

    if(!this.state.finishStarter)
      return (<div className="Music-container"><div className="compteur">Loading...</div></div>);
    else {
      return (
        <App
          shouldAnim={this.state.shouldAnim}
          data={this.state.data}
          canStart={this.handleFinishCompteur.bind(this)}
          onEndMusic={this.onEndMusic.bind(this)} />
        );
    }
  }
}
