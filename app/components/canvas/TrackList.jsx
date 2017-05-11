import React, { Component } from 'react';
import {Link} from 'react-router';
import Track from './Track.jsx';
import * as firebase from "firebase";

export default class TrackList extends Component{

    render(){
        if(this.props.data.users) {
            var nodes = null;
            if(this.props.practice){
                nodes = this.props.data.practice.map((track,i) => {
                    return(<Track dataTrack={track} key={i} practice={this.props.practice}/>);
                });
            }else{
                console.log(this.props.data);
                nodes = this.props.data.tracks.map((track,i) => {
                    return(<Track dataTrack={track} key={i} practice={this.props.practice}/>);
                });
            }

            return (
                <div className="library__slider">
                    <div className="library__slider__tracks">
                        <div className="sectiontitle">{this.props.title}</div>
                        <div className="trackwrapper">
                            {nodes}
                        </div>
                    </div>
                </div>
            );
        } else {
            return(<div/>)
        }
    }
}
