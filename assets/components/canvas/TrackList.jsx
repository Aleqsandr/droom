import React, { Component } from 'react';
import {Link} from 'react-router';
import Track from './Track.jsx';

export default class TrackList extends Component{

    sendMusicId(id) {
        this.props.sendMusicId(id);
    }

    render(){
        let self = this;
        let nodes = this.props.data.tracks.map(function(track,i) {
          return(<Track dataTrack={track} key={i} sendMusicId={self.sendMusicId.bind(self)}/>);
        });
        console.log(nodes)
        return (
            <div className="library__slider">
                <div className="library__slider__tracks">
                    <p className="sectiontitle">TRACKS</p>
                    <div className="trackwrapper">
                        {nodes}
                    </div>
                </div>
            </div>
        );
    }
}
