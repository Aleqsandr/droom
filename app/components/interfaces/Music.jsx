import React, { Component } from 'react';
import Compteur from '../canvas/Compteur.jsx';
import App from '../App.jsx';
import MIDI from '../../../node_modules/MIDI.js';
import "howler";
import utils from "../../assets/modules/useful.js";
import EndMusic from '../interfaces/EndMusic.jsx';

let scoreFinal = 0;

// App component - represents the whole game window
export default class Music extends Component {
  constructor(props) {
    super(props);

    let isLive = false,
        isPractice = false;
    let track = this.props.data.tracks[this.props.params.id]
    if(this.props.params.type == "live" || "practice")
      isLive = true;

    if(this.props.params.type=="practice"){
      track = this.props.data.practice[this.props.params.id]
      isPractice=true;
    }

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
      track:track,
      id:this.props.params.id,
      shouldCheck:true,
      isLive:isLive,
      isPractice:isPractice
    };
  }

  componentWillMount() {
    utils.goFullScreen();
  }

  componentDidMount() {
    var self = this;
    MIDI.Player.BPM = 0;
    MIDI.loadPlugin({
      soundfontUrl: "/soundfont/",
      instrument: "synth_drum",
      onsuccess:() => {
        MIDI.programChange(0, 118);
        MIDI.setVolume(0, 0);
        MIDI.Player.BPM = parseInt(self.state.track.bpm);

        if(!this.state.isPractice){
          self.setState({
            player:MIDI.Player,
            musicMP3 : new Howl({
              src: ['/musics/'+self.state.id+'/song.mp3'],
              onend : () => {
                self.handleEnd()
              }
            }),
            velocity: MIDI.Player.BPM
          })
          self.state.player.loadFile( "/musics/"+self.state.id+"/song.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
        } else {
          self.setState({
            player:MIDI.Player,
            musicMP3 : null,
            velocity: MIDI.Player.BPM
          })
          self.state.player.loadFile( "/patterns/"+self.state.id+"/song.mid", self.launchGame.bind(self),null,function() {console.log("nope")} );
        }
      }
    })
  }

  handleEnd() {
    this.stopAllMusics();
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
    this.stopAllMusics();
    this.setState({
      score:scoreFinal,
      isFinish:true
    })
  }

  getScore(score){
    scoreFinal = score;
  }

  stopAllMusics() {
    if(this.state.musicMP3)
      this.state.musicMP3.unload();
    this.state.player.stop();
  }

  onPauseMusic() {
    // Launche pause.
    if(this.state.isPlaying) {
      this.state.musicMP3.pause();
      this.state.player.pause();
      this.setState({isPlaying:false,shouldCheck:false,data:null})
    } else {
    // Resume music, -5s.
        var self = this;
        this.state.player.currentTime = this.state.player.currentTime - this.state.rewindTime;
        this.setState({isPlaying:true,data:null})
        MIDI.setVolume(0, 0);
        this.state.player.resume();
        this.state.musicMP3.seek(utils.checkTime( self.state.musicMP3.seek() - (self.state.rewindTime*0.001) ));
        setTimeout(function() {
          if(self.state.isPlaying){
            self.state.musicMP3.play();
            self.setState({
              shouldCheck:true
            })
          }
        },(utils.bpmToMs(this.state.velocity)) - utils.pxToTime(utils.bpmToMs(this.state.velocity),70));
    }
  }

  handleFinishCompteur() {

    var self = this;
    this.state.player.start();

    setTimeout(() => {
      if(this.state.isPlaying && !this.state.isPractice)
        this.state.musicMP3.play();
    }, utils.bpmToMs(this.state.velocity) - utils.pxToTime(utils.bpmToMs(this.state.velocity),80));

    this.setState({isPlaying:true});

    let i= 0;
    let start = Date.now();
    this.state.player.addListener((data) => {
      if(this.state.isPractice) {
        if(Date.now() > start+data.end) {
          start = Date.now();
          this.state.player.currentTime = 0;
          this.state.player.resume();
        }
        this.checkStreak();
      }
      // play the note
      MIDI.setVolume(0, 0);
      if(data.message == 144 || data.now == 100.5){ // NoteOn
          this.setState({data:data, shouldAnim:false});
      }
    })
  }

  checkStreak(){
    if(scoreFinal.streak>0 && scoreFinal.streak/this.state.track.nbNotes >= 3) {
      MIDI.Player.removeListener();
      this.state.player.stop();
      this.setState({
        isFinish:true,
        score:scoreFinal
      })
    }
  }

  componentWillUnmount() {
    if(this.state.musicMP3)
      this.state.musicMP3.unload();
    this.state.player.stop();
  }

  render() {
    if(this.state.isFinish)
      return (<EndMusic score={this.state.score} isLive={this.state.isLive} isPractice={this.state.isPractice} idSong={parseInt(this.props.params.id)} nbTracks={this.props.data.practice.length}/>)

    if(!this.state.finishStarter)
      return (<div className="Music-container"><div className="loading">Loading...</div></div>);
    else {
      return (
        <App
          isLive={this.state.isLive}
          isPractice={this.state.isPractice}
          shouldAnim={this.state.shouldAnim}
          data={this.state.data}
          canStart={this.handleFinishCompteur.bind(this)}
          onEndMusic={this.onEndMusic.bind(this)}
          onPauseMusic={this.onPauseMusic.bind(this)}
          velocity={this.state.velocity}
          isPlaying={this.state.isPlaying}
          getScore={this.getScore.bind(this)}
          track={this.state.track}
          shouldCheck={this.state.shouldCheck}
        />
      );
    }
  }
}
