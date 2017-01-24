import React, { Component } from 'react';
import { Link } from 'react-router';

export default class EndMusic extends Component {

  render() {
    return (
        <div className="end">
            <div className="end__content">
                <div className="end__title">End</div>
                <div className="end__score"> Score : {this.props.score}</div>
                <Link to="/menu"><div className="button"><p>MENU</p></div></Link>
            </div>
        </div>
    )
  }
}
