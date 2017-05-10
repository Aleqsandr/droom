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

        let repeatUrl   = "/app/"+ this.props.dataTrack.id + "/studio",
            liveUrl     = "/app/"+ this.props.dataTrack.id + "/live",
            practiceUrl = "/app/"+ this.props.dataTrack.id + "/practice";

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
                            <div className="track_scores">
                                <div className="track__best">Best &nbsp;&nbsp;&nbsp;<span>10232</span> pts</div>
                                <div className="track__best">Yours &nbsp;<span>973</span> pts</div>
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
