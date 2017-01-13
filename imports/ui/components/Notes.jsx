import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Note from './Note.jsx';
import update from 'react-addons-update';

require('/client/MIDI.js');

var player, notes = [], times = [], noteValues = [];
// App component - represents the whole app
export default class Notes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeToFall:3,
      nbItem:0,
      currentNote:0,
      group:this.props.group,
      newp:0,
      notes:[],
      timeOfCollision:3*75/window.innerHeight,
    };

    var self = this;
    MIDI.loadPlugin(function() {
      player = MIDI.Player;
      player.loadFile( "http://www.matthieubessol.com/soundfont/testmusic.mid", player.start,null,function() {console.log("nope")} );
      player.addListener(function(data){
        if(data.message == 144) // NoteOn
          self.addNewNote(data);
      });
    });
  }

  pxToTime(val){
    this.state.timeToFall*val/window.innerHeight;
  }

  addNewNote(data) {
    let size = 50, padding = 25;
    var time = Date.now();
    times.push(time)
    noteValues.push(data.note);
    notes.push(<Note newP={this.state.newp} key={time} noteIO={this.props.noteIO} currentNote={data.note} timeCreation={Date.now()} size={size} x={0} color="#ff0000" timeToFall={this.state.timeToFall} keyCode={this.props.keyCode} group={this.state.group}/>);
    this.setState({
      nbItem:++this.state.nbItem,
      currentNote:data.note
    })
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({group:nextProps.group});
    if(nextProps.group)
        this.launchCollisions(nextProps);
  }

  launchCollisions(nextProps) {
    for (var i = this.refs.notesContainer.getChildren().length - 1; i >= 0; i--) {
        this.checkCollision(this.refs.notesContainer.getChildren()[i],nextProps,i);
    }
  }

  checkCollision(el,nextProps,i) {
    let current = Date.now(),
        diff = times[i]+(this.state.timeToFall - this.state.timeOfCollision)*1000;

    if(diff-100 < current && diff < current+ 200 && noteValues[i] == nextProps.noteIO) {
        times.splice(i, 1);
        notes.splice(i, 1);
        noteValues.splice(i, 1);
        el.destroy();
    }

    if(times[i]+(this.state.timeToFall+1)*1000 < diff) {
        times.splice(i, 1);
        notes.splice(i, 1);
        noteValues.splice(i, 1);
        el.destroy();
    }
  }

  render() {
    let size = 50, padding = 25;
    return (
      <Layer>
        <Group y={0} x={0} ref="notesContainer">
          {notes}
        </Group>
      </Layer>
    );
  }
}
