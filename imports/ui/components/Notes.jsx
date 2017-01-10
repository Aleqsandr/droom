import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Note from './Note.jsx';
import midifile from '/client/midifile.js';
import Stream from '/client/stream.js';
// var midiFileParser = require('midi-file-parser');
//var fs = require('fs');

// App component - represents the whole app
export default class Notes extends Component {

  componentDidMount() {
    // var midiFileParser = require('midi-file-parser');
    // var fs = require('fs')
    // var file = fs.readFileSync('/client/the_strokes-last_nite.midi', 'binary')
    // file = window.atob(file)
    // var midi = midiFileParser(file);
    // console.log(midi)
  }

  render() {
    let size = 50, padding = 25;
    var notes = [];
    for (var i = 4; i >= 0; i--) {
      notes.push(<Note noteIO={this.props.noteIO} timeout={i*1000} key={i} size={size} x={i*2} color="#ff0000" keyCode={this.props.keyCode} group={this.props.group}/>);
    }
    return (
      <Layer>
        <Group y={0} x={window.innerWidth/2}>
          {notes}
        </Group>
      </Layer>
    );
  }
}
