import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import App from '../App.jsx';
import MIDI from 'midi.js';
import "howler";
import utils from "../../modules/useful.js";
import EndMusic from '../interfaces/EndMusic.jsx';

let scoreFinal = 0;

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
      velocity:null,
      startTime:null,
      pauseTime:null,
      isPlaying:false,
      rewindTime:5000,
      score:null,
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
        MIDI.Player.BPM = 150;
        self.setState({
          player:MIDI.Player,
          musicMP3 : new Howl({
            src: ['./musics/3/song3.wav'],
            onend : () => {
              console.log("start end")
              self.handleEnd()
            }
          }),
          velocity: MIDI.Player.BPM
        })
        self.state.player.loadFile( "./musics/3/song3.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
      }
    })
  }

  handleEnd() {
    this.setState({
      isFinish:true,
      score:scoreFinal
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
      score:scoreFinal,
      isFinish:true
    })
  }

  getScore(score){
    scoreFinal = score;
    // this.setState({
    //   score:score
    // })
  }

  onPauseMusic() {
    // Launche pause.
    if(this.state.isPlaying) {
      this.state.musicMP3.pause();
      this.state.player.pause();
      this.setState({isPlaying:false})
    } else {
    // Resume music, -5s.
      var self = this;
      this.setState({isPlaying:true})
      if(this.state.player.currentTime <= this.state.rewindTime) {
        MIDI.setVolume(0, 0);
        this.state.player.currentTime = 0;
        this.state.player.resume();
        setTimeout(function() {
          self.state.musicMP3.play();
        },(utils.bpmToMs(this.state.velocity)));
      } else {
        MIDI.setVolume(0, 0);
        this.state.player.currentTime = this.state.player.currentTime - this.state.rewindTime;
        this.state.player.resume();
        setTimeout(function() {
          self.state.musicMP3.seek(self.state.musicMP3.seek() - (self.state.rewindTime*0.001));
          self.state.musicMP3.play();
        },(utils.bpmToMs(this.state.velocity)));
      }
    }
  }

  handleFinishCompteur() {

    var self = this;
    this.state.player.start();

    setTimeout(function() {
       self.state.musicMP3.play();
    }, utils.bpmToMs(this.state.velocity) - utils.pxToTime(utils.bpmToMs(this.state.velocity),73));

    this.setState({isPlaying:true});

    this.state.player.addListener(function(data){
      // play the note
      MIDI.setVolume(0, 0);
      let prevData = data;
      if(data.message == 144 || data.now == 100.5){ // NoteOn
        // if the app is crashing, you better remove that following if statement line
        if(data.now != prevData.now && data.message != prevData.message && data.note != prevData.now)
          self.setState({data:data, shouldAnim:false});
      }
    });
  }

  componentWillUnmount() {
    this.state.musicMP3.unload();
    this.state.player.stop();
  }

  render() {
    if(this.state.isFinish)
      return (<EndMusic score={this.state.score}/>)

    if(!this.state.finishStarter)
      return (<div className="Music-container"><div className="loading">Loading...</div></div>);
    else {
      return (
        <App
          shouldAnim={this.state.shouldAnim}
          data={this.state.data}
          canStart={this.handleFinishCompteur.bind(this)}
          onEndMusic={this.onEndMusic.bind(this)}
          onPauseMusic={this.onPauseMusic.bind(this)}
          velocity={this.state.velocity}
          isPlaying={this.state.isPlaying}
          getScore={this.getScore.bind(this)}
        />
      );
    }
  }
}
