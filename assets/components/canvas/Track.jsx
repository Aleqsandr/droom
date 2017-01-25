import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Track extends Component{

    render(){
        return (
            <div className="trackelement">
                <div className="trackelement__left">
                    <p className="tracktitle">{this.props.dataTrack.name}</p>
                    <p className="trackartist">{this.props.dataTrack.artist}</p>
                    <div className="trackdetails">
                        <p className="trackyear">{this.props.dataTrack.year} &mdash; </p>
                        <p className="trackdifficulty">&#9733;&#9733;&#9733;</p>
                    </div>
                </div>
                <div className="trackelement__right">
                    <Link to="/app"><div className="repeat"><p>REPEAT</p></div></Link>
                    <a href="#"><div className="live"><p>LIVE</p></div></a>
                </div>
            </div>
        );
    }
}
