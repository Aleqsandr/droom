import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

// Simple drawing rectangle class
class MyRect extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        color: 'green'
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    }
    render() {
        return (
            <Rect
                x={10} y={10} width={50} height={50}
                fill={this.state.color}
                shadowBlur={10}
                onClick={this.handleClick}
            />
        );
    }
}

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1>Drumloop</h1>
        </header>
        <main>
          <Stage width={700} height={700}>
            <Layer>
                <MyRect/>
            </Layer>
          </Stage>
        </main>
      </div>
    );
  }
}
