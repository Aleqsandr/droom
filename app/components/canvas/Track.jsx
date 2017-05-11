import React, { Component } from 'react';
import {Link} from 'react-router';
import Star from './Star.jsx'
import utils from '../../assets/modules/useful.js'
import * as firebase from "firebase";

export default class Track extends Component{
    constructor(props) {
        super(props);

        this.state = {
            userbest:null,
            yourscore:0,
            bestscore:null,
            keyfinal:null
        };
    }
    render(){
        let stars = [];
        for (var i = 0; i < this.props.dataTrack.difficulty; i++) {
            stars.push(<Star key={i}/>)
        }

        let repeatUrl   = "/app/"+ this.props.dataTrack.id + "/studio",
            liveUrl     = "/app/"+ this.props.dataTrack.id + "/live",
            practiceUrl = "/app/"+ this.props.dataTrack.id + "/practice";

        var bestscore = 0;
        var keyfinal = null;

        if(!this.props.practice){
            if(!this.state.bestscore){
                for(let val in this.props.dataTrack.scores) {
                    if(this.props.dataTrack.scores[val].score > bestscore){
                        bestscore = this.props.dataTrack.scores[val].score;
                        keyfinal = this.props.dataTrack.scores[val].userid;
                    }
                };
                this.setState({bestscore:bestscore, keyfinal:keyfinal});
            }
            if(!this.state.userbest){

                var usersList;

                firebase.database().ref('users').once('value')
                        .then((vals) => {
                            usersList = vals.val();
                            for (let val in usersList) {
                                if(usersList[val].id == this.state.keyfinal){
                                    let str = usersList[val].email;
                                    let curUserName = str.substring(0, str.indexOf("@"));
                                    this.setState({userbest: curUserName})
                                }
                            }
                        })
            }

            var curUser = firebase.auth().currentUser;
            var yours=0;
            if(curUser){
                if(this.state.yourscore == 0){

                    for(let val in this.props.dataTrack.scores) {
                        if(this.props.dataTrack.scores[val].userid == curUser.uid){
                            if(this.props.dataTrack.scores[val].score > yours){
                                yours = this.props.dataTrack.scores[val].score;
                            }

                            bestscore = this.props.dataTrack.scores[val].score;
                            keyfinal = this.props.dataTrack.scores[val].userid;
                        }
                    };

                    this.setState({yourscore:yours});
                }
            }
        }

        return (
            <div className="trackelement">
            <div className="trackelement__left">
            <p className="tracktitle">{this.props.dataTrack.name}</p>
            {!this.props.practice ? (
                <p className="trackartist">{this.props.dataTrack.artist}</p>
            ) : (<div/>)}
            <div className="trackdetails">
                {!this.props.practice ? (
                     <p className="trackyear">{this.props.dataTrack.year} &mdash; </p>
                 ) : (<div/>)}
                <p className="trackdifficulty">{stars}</p>
            </div>
            {!this.props.practice ? (
                 <div className="trackscores">
                     <p className="bestscore">best : {this.state.userbest} - {this.state.bestscore} </p>
                     <p className="bestscore">your score : {this.state.yourscore}</p>
                 </div>
             ) : (<div/>)}
            </div>
            <div className={!this.props.practice ? ("trackelement__right") : ("trackelement__right trackelement__right--practice")} onClick={utils.goFullScreen}>
                {!this.props.practice ? (
                     <div className="trackelement__wrapper">
                         <Link to={repeatUrl}><div className="repeat"><p>STUDIO</p></div></Link>
                         <Link to={liveUrl}><div className="live"><p>LIVE</p></div></Link>
                     </div>
                 ) : (
                     <Link to={practiceUrl}><div className="live"><p>PRACTICE</p></div></Link>
                 )}
            </div>
            </div>
        );
    }
}
