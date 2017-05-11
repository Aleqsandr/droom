import React, { Component } from 'react';
import * as firebase from "firebase";

let config = {
    apiKey: "AIzaSyDtxBHh5p5jLvEfP_O0iuDxMh32hubEnpk",
    authDomain: "droom-c7526.firebaseapp.com",
    databaseURL: "https://droom-c7526.firebaseio.com",
    projectId: "droom-c7526",
    storageBucket: "droom-c7526.appspot.com",
    messagingSenderId: "622797889787"
};
firebase.initializeApp(config)

export default class GameHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas:null,
            id:null
        };
    }
    sendMusicId(id) {
        this.setState({
            id:id
        })
    }

    componentWillMount(){
        firebase.database().ref().once('value')
                .then((vals) => {
                    this.setState({datas: vals.val()});
                })
    }

    render() {

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
