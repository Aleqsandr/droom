import React, { Component } from 'react';
import {Link} from 'react-router';
import TrackList from '../canvas/TrackList.jsx';
import utils from '../../assets/modules/useful.js';

// App component - represents the whole app
export default class Menu extends Component
{
	constructor(props){
   		super(props);
    	this.state = {
      		"it": 0,
    	};
  	}

	usernamein(){
		let logout = document.body.querySelector(".logout");
		let logout__img = document.body.querySelector(".logout__img");
		if (this.state.it % 2 == 0){
			this.refs.triangle.classList.add("avatar__img--isopen");
			logout.classList.add("logout--lower");
			logout__img.classList.remove("logout__img--invisible");
		}
		else{
			this.refs.triangle.classList.remove("avatar__img--isopen");
			logout.classList.remove("logout--lower");
			logout__img.classList.add("logout__img--invisible");
		}
		this.setState({
			it : this.state.it + 1
		})
	}

    componentDidMount() {
        utils.exitFullScreen();
    }

    render(){
        return (
            <div className="library">
                <div className="library__left">
                	<div className="user">
                		<div className="isconnected"></div>
                		<div className="logout">
                			<Link to="/"><div className="logout__img logout__img--invisible" ref="logout"></div></Link>
                		</div>
                		<div className="avatar">
                			<a href="#"><div className="avatar__img" onClick={this.usernamein.bind(this)} ref="triangle"></div></a>
                		</div>
                		<div className="username">
                			<p className="username__text">DROOMY</p>
                		</div>
                	</div>
                    <div className="freemode">
                        <Link to="/freemode" className="freemode__text">Freemode</Link>
                    </div>
                    <div className="practice">
                        <Link to="/practice" className="practice__text">Practice</Link>
                    </div>
                </div>
            	<div className="library__logo"></div>
            	<TrackList data={this.props.data} title="TRACKS"/>
            </div>
        )
    }
}
