import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class Home extends Component {
  render() {
    return (
      <div className="Home-container">
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__list__item"><Link to="/app">LET ME PLAY</Link></li>
            <li className="nav__list__item">ABOUT</li>
          </ul>
        </nav>
        <div className="bg1"></div>
        <div className="bg2"></div>
        <div className="bg3"></div>
        <div className="bg4"></div>
        <div className="home">
          <img className="home__logo" src="/img/mainlogo.gif"></img>
        </div>
      </div>
    );
  }
}
