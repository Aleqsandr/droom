import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Note from './Note.jsx';
import update from 'react-addons-update';
import MIDI from 'midi.js';
import utils from "../../modules/useful.js";

var player, notes = [], times = [], noteValues = [], prevTime= 0;
// App component - represents the whole app
export default class Notes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeToFall:3,
      prevData:null,
      nbItem:0,
      currentNote:0,
      group:this.props.group,
      newp:0,
      notes:[],
      key:null,
      timeOfCollision:utils.pxToTime(75)
      //core:null,
    };
  }

  addNewNote(data) {
    if(!data) return;
    let size = 50, padding = 25;
    var time = Date.now();
    times.push(time)
    let note = data.note, isKick=false;
    if(data.note === 42)
      note = 49;
    noteValues.push(note);
    if(note == 36 && !this.props.isKeyboard)
      isKick = true;
    notes.push(<Note newP={this.state.newp} isKick={isKick} key={time} noteIO={this.props.noteIO} currentNote={note} timeCreation={Date.now()} size={size} x={0} color="#ff0000" timeToFall={this.state.timeToFall} keyCode={this.props.keyCode} group={this.state.group} isKeyboard={this.props.isKeyboard}/>);

    this.setState({
      nbItem:++this.state.nbItem,
      currentNote:data.note
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log("ce que reçoit notes.jsx : ",nextProps.data)
    if(nextProps.data){
      this.setState({prevData:nextProps.data.now})
      if(nextProps.data.now != this.state.prevData)
        this.addNewNote(nextProps.data)
    }
    this.setState({group:nextProps.group});
    if(nextProps.group && prevTime != nextProps.timeKick){
      prevTime = nextProps.timeKick;
      //this.launchCollisions(nextProps);
      this.checkKey(nextProps.keyCode);
    }
  }

  launchCollisions(nextProps) {
    let id = null;
    let tab = 0;
    for (let i = 0; i < this.state.group.getChildren().length; i++) {
      if(this.state.group.getChildren()[i].getAttr("note") == nextProps.noteIO)
        id = i;

    }
    for (let i = this.refs.notesContainer.getChildren().length - 1; i >= 0; i--) {
        let tab = [nextProps.noteIO,id];
        this.checkCollision(this.refs.notesContainer.getChildren()[i],tab,i);
    }
    this.animKick(id);
  }

  animKick(id) {
    let self = this, time =50;

    if(!this.state.group || id==null)return;
    console.log(this.state.group.getChildren()[id]);
    this.state.group.getChildren()[id].getChildren()[0].to({
      scaleX: 1,
      scaleY: 1,
      duration: 0,
    });

    this.state.group.getChildren()[id].getChildren()[0].to({
      scaleX: 1.3,
      scaleY: 1.3,
      duration: time/100,
    });

    setTimeout(function() {
      self.state.group.getChildren()[id].getChildren()[0].to({
        scaleX: 1,
        scaleY: 1,
        duration: time/100
      });
    },time*2);
  }

  checkKey(key){
    let current = 0;
    if(key === 83){
      current = [46, 0];
      this.setState({key:46});
    }
    if(key === 68){
      current = [49, 1];
      this.setState({key:49});
    }
    if(key === 70){
      current = [38, 2];
      this.setState({key:38});
    }
    if(key === 71){
      current = [48, 3];
      this.setState({key:48});
    }
    if(key === 72){
      current = [36, 4];
      this.setState({key:36});
    }
    if(key === 74){
      current = [45, 5];
      this.setState({key:45});
    }
    if(key === 75){
      current = [43, 6];
      this.setState({key:43});
    }
    if(key === 76){
      current = [51, 7];
      this.setState({key:51});
    }

    for (var i = this.refs.notesContainer.getChildren().length - 1; i >= 0; i--) {
        this.checkCollision(this.refs.notesContainer.getChildren()[i],current,i);
    }

    this.animKick(current[1]);
  }

  checkCollision(el,valNote,i) {

    let current = Date.now(),

    impactTime = times[i]+ 3000 - this.state.timeOfCollision;

    MIDI.setVolume(0,70);
    MIDI.noteOn(0, valNote[0], 70, 0);

    let diff = Math.abs(current - impactTime);

    if(diff < utils.pxToTime(70) && noteValues[i] == valNote[0]) {
        // Success.
        times.splice(i, 1);
        notes.splice(i, 1);
        noteValues.splice(i, 1);
        el.destroy();

        this.props.getTimingNoteSuccess(diff);

        let self = this, time =50;
        this.state.group.getChildren()[valNote[1]].getChildren()[0].stroke("#ccedff");
        this.state.group.getChildren()[valNote[1]].getChildren()[0].strokeWidth(5);
        setTimeout(function() {
          self.state.group.getChildren()[valNote[1]].getChildren()[0].strokeWidth(0);
        },100)

        this.props.getTimingNoteSuccess(diff);
        //this.incrementScore();

        return;
    }

    if(times[i]+(this.state.timeToFall+5)*1000 + utils.pxToTime(75) < current) {
        // Destroy. Failure

        times.splice(i, 1);
        notes.splice(i, 1);
        noteValues.splice(i, 1);
        el.destroy();

    }
    this.props.getTimingNoteSuccess(diff);
    return;

  }

  /*incrementScore() {

    let tmp = this.state.score;
    tmp += 10;

    this.setState({score: tmp});

    this.props.getScoreUpdate(this.state.score);
  }

  decrementScore() {

    let tmp = this.state.score;
    tmp -= 2;

    this.setState({score: tmp});

    this.props.getScoreUpdate(this.state.score);

  }*/

  render() {
    let size = 50, padding = 25;
    return (
      <Layer>
        <Group y={0} x={-25} ref="notesContainer">
          {notes}
        </Group>
      </Layer>
    );
  }
}
