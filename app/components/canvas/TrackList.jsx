import React, { Component } from 'react';
import {Link} from 'react-router';
import Track from './Track.jsx';

export default class TrackList extends Component{

    render(){
        let self = this;
        let nodes = this.props.data.tracks.map((track,i) => {
          return(<Track dataTrack={track} key={i} practice={this.props.practice}/>);
        });

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
    }
}
