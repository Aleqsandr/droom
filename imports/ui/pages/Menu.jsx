import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class Menu extends Component {
  render() {
    return (
      <div className="Menu-container">
        <Link to="/app">Start</Link>
      </div>
    );
  }
}
