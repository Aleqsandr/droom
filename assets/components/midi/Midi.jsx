import React, { Component } from 'react';
//require('web-midi-api');



function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    console.log('MIDI data', data); // MIDI data [144, 63, 73]
}

var midi=null,
    data=null,
    cmd=null,
    channel=null,
    type=null,
    note=null,
    velocity=null,
    input=null;

// App component - represents the whole app
export default class Midi extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentDidMount() {
    this.checkMidi();
  }

  checkMidi() {
    var self = this;
    // request MIDI access
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({
            sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
        }).then(self.onMIDISuccess.bind(self), self.onMIDIFailure.bind(self));
    } else {
        alert("No MIDI support in your browser.");
    }
  }

  onMIDISuccess(midiAccess) {
    midi = midiAccess;
    var inputs = midi.inputs.values();
    for(var input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
      this.listInputs(input);
    }

    midi.onstatechange = this.onStateChange.bind(this);
  }

  listInputs(inputs) {
      var input = inputs.value;
      console.log("Input port : [ type:'" + input.type + "' id: '" + input.id +
          "' manufacturer: '" + input.manufacturer + "' name: '" + input.name +
          "' version: '" + input.version + "']");
  }

  onMIDIFailure(e) {
    console.log("fail");
  }

  onMIDIMessage(event) {
    this.props.getNoteNumber(event.data);
  }

  onStateChange(event) {
    var port = event.port,
            state = port.state,
            name = port.name,
            type = port.type;
    if (type == "input") console.log("name", name, "port", port, "state", state);
  }

  render() {
    return (
      <div></div>
    );
  }
}
