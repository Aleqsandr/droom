import React, { Component } from 'react';
import {Link} from 'react-router';
import Star from './Star.jsx'

export default class Track extends Component{
    handleClick() {
        this.props.sendMusicId(this.props.dataTrack.id);
    }

    render(){
        let stars = [];
        for (var i = 0; i < this.props.dataTrack.difficulty; i++) {
            stars.push(<Star/>)
        }
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
                <div className="trackelement__right" onClick={this.handleClick.bind(this)}>
                    <Link to="/app"><div className="repeat"><p>REPEAT</p></div></Link>
                    <a href="#"><div className="live"><p>LIVE</p></div></a>
                </div>
            </div>
        );
    }
}
