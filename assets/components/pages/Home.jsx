import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class Home extends Component {
  render() {
    return (
      <div className="Home-container">
        <div className="bg1"></div>
        <div className="bg2"></div>
        <div className="bg3"></div>
        <div className="bg4"></div>
        <nav className="menu">
          <div className="menu__logo"></div>
          <ul className="menu__list">
            <li className="menu__list__item"><Link to="/app" className="play">PLAY</Link></li>
            <li className="menu__list__item"><Link to="/about">ABOUT</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}
