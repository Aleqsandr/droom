import React, { Component } from 'react';
import {Link} from 'react-router';
import Track from '../canvas/Track.jsx';

// App component - represents the whole app
export default class Menu extends Component
{
	constructor(props)
	{
   		super(props);
    	this.state = {
      		"it": 0,
    	};
  	}

	usernamein()
	{
		let logout = document.body.querySelector(".logout");
		let logout__img = document.body.querySelector(".logout__img");
		if (this.state.it % 2 == 0)
		{
			this.refs.triangle.classList.add("avatar__img--isopen");
			logout.classList.add("logout--lower");
			logout__img.classList.remove("logout__img--invisible");
		}
		else
		{
			this.refs.triangle.classList.remove("avatar__img--isopen");
			logout.classList.remove("logout--lower");
			logout__img.classList.add("logout__img--invisible");
		}
		this.setState({
			it : this.state.it + 1
		})
	}

    render()
    {
        return (
            <div className="library">
            	<div className="user">
            		<div className="isconnected"></div>
            		<div className="logout">
            			<a href="#"><div className="logout__img" ref="logout"></div></a>
            		</div>
            		<div className="avatar">
            			<a href="#"><div className="avatar__img" onClick={this.usernamein.bind(this)} ref="triangle"></div></a>
            		</div>
            		<div className="username">
            			<p className="username__text">CHERRIER77</p>
            		</div>
            	</div>
            	<div className="library__logo"></div>
            	<div className="library__slider">
            		<div className="library__slider__tracks">
            			<p className="sectiontitle">TRACKS</p>
            			<Track/>
            		</div>
            	</div>
            </div>
        )
    }
}