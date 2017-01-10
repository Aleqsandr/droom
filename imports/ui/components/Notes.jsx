import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Note from './Note.jsx';

// App component - represents the whole app
export default class Notes extends Component {

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
