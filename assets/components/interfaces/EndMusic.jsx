import React, { Component } from 'react';
import { Link } from 'react-router';

export default class EndMusic extends Component
{
    constructor(props) {
        super(props);
        if (this.props.score.vanessabar <= 10)  {
            this.state = {
                "text": "TRY AGAIN"
            }
        }
        else if (this.props.score.vanessabar > 10 && this.props.score.vanessabar <= 200)    {
            this.state = {
                "text": "BRING IT ON!"
            }
        }
        else if (this.props.score.vanessabar > 200) {
            this.state = {
                "text": "YOU ROCK MATE!"
            }
        }
    }

  render() {
    var contentLive = (<div/>)
    if(this.props.isLive) {
        contentLive = (
            <div>
                <div className="end__title">{this.state.text}</div>
                <div className="end__score"> Score : {this.props.score.score}</div>
                <div className="end__score"> Streak notes : {this.props.score.streak}</div>
            </div>
        )
    }
    return (
        <div className="end">
            <div className="end__content">
                {contentLive}
                <Link to="/menu"><div className="button"><p>MENU</p></div></Link>
            </div>
        </div>
    )
  }
}
