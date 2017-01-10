import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class Home extends Component {
  render() {
    return (
      <div className="Home-container">
        <nav className="nav">
          <ul className="nav__list">
            <li className="list__item">Register</li>
            <li className="list__item">Login</li>
            <li className="list__item">About</li>
          </ul>
        </nav>
        <div className="home">
          <img className="home__logo"></img>
          <button className="homme__playbtn"><Link to="/app">Play game</Link></button>
        </div>
      </div>
    );
  }
}
