import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import App from '../App.jsx';
import MIDI from 'midi.js';
import "howler";
import utils from "../../modules/useful.js";
import EndMusic from '../interfaces/EndMusic.jsx';

let scoreFinal = 0;

// App component - represents the whole game window
export default class Freemode extends Component {
  constructor(props) {
    super(props);

    let isLive = false;
    if(this.props.params.type == "live")
      isLive = true;

    this.state = {
      finishStarter:false,
      player:null,
      data:null,
      shouldAnim:false,
      score:null,
      isFinish:false,
      musicMP3:null,
      velocity:null,
      startTime:null,
      pauseTime:null,
      isPlaying:true,
      rewindTime:5000,
      score:null,
      track:this.props.data.tracks[this.props.params.id || 0],
      id:this.props.params.id,
      shouldCheck:true,
      isLive:isLive
    };
  }

  componentWillMount() {
    utils.goFullScreen();
  }

  componentDidMount() {
    var self = this;
    MIDI.loadPlugin({
      soundfontUrl: "/soundfont/",
      instrument: "synth_drum",
      onsuccess:function() {
        MIDI.programChange(0, 118);
        MIDI.setVolume(0, 0);
        self.setState({
          player:MIDI.Player,
        })
        self.state.player.loadFile( "/musics/0/song.mid",null,function() {console.log("nope")} );
      }
    })
  }

  componentWillUnmount() {
    this.state.player.stop();
  }

  render() {
    return (
      <App
        isFreemode
        data={this.state.data}
        canStart={true}
        velocity={this.state.velocity}
        track={this.state.track}
      />
    );
  }
}
