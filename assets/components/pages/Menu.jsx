import React, { Component } from 'react';
import {Link} from 'react-router';
import TrackList from '../canvas/TrackList.jsx';

var data = {
  "tracks": [
    {
      "id":0,
      "name": "We Bros",
      "artist": "WU LYF",
      "year": "2013",
      "difficulty":3,

    },
    {
      "id":1,
      "name": "Killing in the name of",
      "artist": "Rage against the machine",
      "year": "1992",
      "difficulty":2,

    },
    {
      "id":2,
      "name": "We Bros",
      "artist": "WU LYF",
      "year": "2013",
      "difficulty":3,

    },
    {
      "id":3,
      "name": "We Bros",
      "artist": "WU LYF",
      "year": "2013",
      "difficulty":2,

    }
  ]
}


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
            			<a href="#"><div className="logout__img logout__img--invisible" ref="logout"></div></a>
            		</div>
            		<div className="avatar">
            			<a href="#"><div className="avatar__img" onClick={this.usernamein.bind(this)} ref="triangle"></div></a>
            		</div>
            		<div className="username">
            			<p className="username__text">CHERRIER77</p>
            		</div>
            	</div>
            	<div className="library__logo"></div>
            	<TrackList data={data}/>
            </div>
        )
    }
}
