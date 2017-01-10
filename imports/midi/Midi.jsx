import React, { Component } from 'react';

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
      console.log(input.value);
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
      console.log(input.value);
      console.log(input.value.onmidimessage);
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
    // console.log(event.data);

    this.props.getNoteNumber(event.data);
    // this.setState({
    //   data     :event.data,
    //   cmd      : data[0] >> 4,
    //   channel  : data[0] & 0xf,
    //   type     : data[0] & 0xf0,
    //   note     : data[1],
    //   velocity : data[2]
    // });
    // with pressure and tilt off
    // note off: 128, cmd: 8
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11:
    // bend: 224, cmd: 14
    //console.log(data[0] & 0xf0);
    // switch (data[0] & 0xf0) {
    //     case 144: // noteOn message
    //         this.noteOn(note, velocity);
    //         break;
    //     case 128: // noteOff message
    //         this.noteOff(note, velocity);
    //         break;
    // }

    //console.log('data', data, 'cmd', cmd, 'channel', channel);
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
