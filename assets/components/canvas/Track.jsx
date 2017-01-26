import React, { Component } from 'react';
import {Link} from 'react-router';
import Star from './Star.jsx'
import utils from '../../modules/useful.js'

export default class Track extends Component{

    render(){
        let stars = [];
        for (var i = 0; i < this.props.dataTrack.difficulty; i++) {
            stars.push(<Star key={i}/>)
        }

        let repeatUrl = "/app/"+ this.props.dataTrack.id + "/repeat",
            liveUrl   = "/app/"+ this.props.dataTrack.id + "/live";
        return (
            <div className="trackelement">
                <div className="trackelement__left">
                    <p className="tracktitle">{this.props.dataTrack.name}</p>
                    <p className="trackartist">{this.props.dataTrack.artist}</p>
                    <div className="trackdetails">
                        <p className="trackyear">{this.props.dataTrack.year} &mdash; </p>
                        <p className="trackdifficulty">{stars}</p>
                    </div>
                </div>
                <div className="trackelement__right" onClick={utils.goFullScreen}>
                    <Link to={repeatUrl}><div className="repeat"><p>REPEAT</p></div></Link>
                    <Link to={liveUrl}><div className="live"><p>LIVE</p></div></Link>
                </div>
            </div>
        );
    }
}
