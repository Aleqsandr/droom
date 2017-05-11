import React, { Component } from 'react';

import * as firebase from "firebase";
import {Link, browserHistory } from 'react-router';

export default class GameHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas:[],
            id:null
        };
    }
    sendMusicId(id) {
        this.setState({
            id:id
        })
    }

    render() {
        console.log("gamehandler")
        return(
            <div className="game">
                {React.cloneElement(this.props.children, {
                     sendMusicId:this.sendMusicId.bind(this),
                     data:this.state.datas,
                     id:this.state.id
                 })}
            </div>
        )
    }
}
