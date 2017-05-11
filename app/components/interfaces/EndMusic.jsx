import React, { Component } from 'react';
import { Link } from 'react-router';
import * as firebase from "firebase";

export default class EndMusic extends Component
{
    constructor(props) {
        super(props);
        if(this.props.isPractice)
            return;
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


        var current = firebase.auth().currentUser;

        firebase.database().ref('tracks/' + this.props.idSong +'/scores').push({
            score:this.props.score.score,
            userid:current.uid
        });


        var contentLive = (<div/>)

        if(this.props.isPractice) {
            let nb = parseInt(this.props.idSong)+1;
            let url = "/app/"+ nb +"/practice"
            let contentLink = (<Link to={url}><div className="button"><p>NEXT PATTERN</p></div></Link>);
            if(this.props.idSong+1 >= this.props.nbTracks)
                contentLink = (<div/>)
            contentLive = (
                <div>
                    <div className="end__score"> Streak notes : {this.props.score.streak}</div>
                </div>
            )
        } else if(this.props.isLive) {
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
