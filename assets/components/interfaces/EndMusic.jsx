import React, { Component } from 'react';
import { Link } from 'react-router';

export default class EndMusic extends Component
{
    constructor(props)
    {
        super(props);
        console.log(this.props.score.score);
    }

  render() {
    return (
        <div className="end">
            <div className="end__content">
                <div className="end__title">End</div>
                <div className="end__score"> Score : {this.props.score.score}</div>
                <div className="end__score"> Streak : {this.props.score.streak}</div>
                <div className="end__score"> VBar : {this.props.score.vanessabar}</div>
                <Link to="/menu"><div className="button"><p>MENU</p></div></Link>
            </div>
        </div>
    )
  }
}
