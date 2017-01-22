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
      isFinish:false,
      musicMP3:null,
      velocity:null
    };
  }

  componentDidMount() {
    var self = this;
    MIDI.Player.BPM = 0;
    MIDI.loadPlugin({
      soundfontUrl: "/soundfont/",
      instrument: "synth_drum",
      onsuccess:function() {
        MIDI.programChange(0, 118);
        MIDI.setVolume(0, 0);
        MIDI.Player.BPM = 120;
        self.setState({
          player:MIDI.Player,
          musicMP3 : new Howl({src: ['./musics/2/testDroom2.wav']}),
          velocity: MIDI.Player.BPM
        })
        self.state.player.loadFile( "./musics/2/drumDroomTest.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
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

    this.state.musicMP3.stop();
  }

  handleFinishCompteur() {
    var self = this;
    this.state.player.start();

    setTimeout(function() {
      self.state.musicMP3.play();
    },(this.state.velocity * 2000 / 120) - utils.pxToTime(50));


    this.state.player.addListener(function(data){
      // play the note

      MIDI.setVolume(0, 0);

      if(data.message == 144 || data.now == 125.5){ // NoteOn
        self.setState({data:data, shouldAnim:false})
      }
    });
  }

  render() {
    if(this.state.isFinish)
      return <EndMusic score={this.state.score}/>

    if(!this.state.finishStarter)
      return (<div className="Music-container"><div className="loading">Loading...</div></div>);
    else {
      return (
        <App
          shouldAnim={this.state.shouldAnim}
          data={this.state.data}
          canStart={this.handleFinishCompteur.bind(this)}
          onEndMusic={this.onEndMusic.bind(this)}
          velocity={this.state.velocity}
        />
      );
    }
  }
}
