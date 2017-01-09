import React, { Component } from 'react';
import ReactCanvas from 'react-canvas';

var Surface = ReactCanvas.Surface;
var Layer = ReactCanvas.Sayer;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;

// App component - represents the whole app
export default class App extends Component {

  render() {


    return (
      <div className="container">
        <header>
          <h1>Drumloop</h1>
        </header>
        <main>
          <Surface class="game-window" width='800' height='600'>

          </Surface>
        </main>
      </div>
    );
  }
}
