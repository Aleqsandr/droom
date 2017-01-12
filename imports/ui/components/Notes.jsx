import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Note from './Note.jsx';

require('/client/MIDI.js');

var notes= [];
var player;
// App component - represents the whole app
export default class Notes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeToFall:3,
      nbItem:0,
      currentNote:0,
      group:this.props.group
    };

    var self = this;
    MIDI.loadPlugin(function() {
      player = MIDI.Player;
      player.loadFile( "http://www.matthieubessol.com/soundfont/testmusic.mid", player.start,null,function() {console.log("nope")} );
      player.addListener(function(data){
        self.addNewNote(data);
      });
    });
  }

  addNewNote(data) {
    console.log("ok")
    this.setState({
      nbItem:++this.state.nbItem,
      currentNote:data.note
    })
  }

  componentDidMount() {
    // this.addNewNote();
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   group:nextProps.group
    // })
  }

  render() {
    let size = 50, padding = 25;
    notes.push(<Note noteIO={this.props.noteIO} currentNote={this.state.currentNote} timeCreation={Date.now()} size={size} x={0} color="#ff0000" timeToFall={this.state.timeToFall} keyCode={this.props.keyCode} group={this.state.group}/>);
    return (
      <Layer>
        <Group y={0} x={window.innerWidth/3}>
          {notes}
        </Group>
      </Layer>
    );
  }
}
