import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import App from '../App.jsx';
import MIDI from 'MIDI.js';
import "howler";
import utils from "../../assets/modules/useful.js";
import EndMusic from '../interfaces/EndMusic.jsx';

let scoreFinal = 0;

// App component - represents the whole game window
export default class Freemode extends Component {
  constructor(props) {
    super(props);

    let isLive = false;
    if(this.props.params.type == "live")
      isLive = true;

    let data = [];
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let str = user.email;
        let curUserName = str.substring(0, str.indexOf("@"));

        firebase.database().ref("/").once('value')
            .then((vals) => {
              data = vals.val();
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
                  isPlaying:false,
                  rewindTime:5000,
                  score:null,
                  track:data.tracks[this.props.params.id],
                  id:this.props.params.id,
                  shouldCheck:true,
                  isLive:isLive
                };
            })
  }

  componentWillMount() {
    utils.goFullScreen();
  }

  componentDidMount() {
    MIDI.loadPlugin({
      soundfontUrl: "/vendors/soundfont/",
      instrument: "synth_drum",
      onsuccess:function() {
        MIDI.programChange(0, 118);
        MIDI.setVolume(0, 0);
        self.setState({
          player:MIDI.Player,
        })
        self.state.player.loadFile( "/vendors/musics/"+self.state.id+"/song.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
      }
    })
  }

  componentWillUnmount() {
    this.state.musicMP3.unload();
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
