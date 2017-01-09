import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import BaseDrum from './components/BaseDrum.jsx';
import Notes from './components/Notes.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyCode:null,
      group:null
    };
  }

  componentDidMount() {
    document.addEventListener("keydown",this.handleKey.bind(this));
  }

  handleKey(e) {
    this.setState({
      keyCode:e.keyCode
    });
  }

  handleGroup(val) {
    this.setState({
      group:val
    });
  }

  render() {
    return (
      <div className="container">
        <main>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <BaseDrum handleGroup={this.handleGroup.bind(this)}/>
            <Notes keyCode={this.state.keyCode} group={this.state.group}/>
          </Stage>
        </main>
      </div>
    );
  }
}
