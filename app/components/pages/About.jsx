import React, { Component } from 'react';
import {Link} from 'react-router';

// App component - represents the whole app
export default class About extends Component{
    render(){
        return(
            <div className="About-container">
                <Link to="/"><div className="back"></div></Link>
                <p className="title">ABOUT</p>
                <p className="text">
                    Droom is a web application/game which makes you able to learn or improve your drumming skills. You can test your rythmic capacities
                    by playing on your keyboard, but the best conditions is of course to play with a connected MIDI drumset. Three play modes are now
                    available : Rhythm mode, Practice mode, Freedrum mode. Hit the right note at the right time and chain streak notes to blow up your
                    score. Create your account, challenge your friends, be the best, and let's music.
                </p>
                <br />
                <div className="names">
                    <a href="http://www.matthieubessol.com"><p className="text name">Matthieu Bessol</p></a>
                    <a href="http://www.aleqsandr.fr"><p className="text name">Alexandre Reho</p></a>
                    <a href="http://www.noisiv.fr"><p className="text name">Lucas Dussouchaud</p></a>
                </div>
            </div>
        );
    }
}
